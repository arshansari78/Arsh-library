import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PiStudentFill, PiBooksFill, PiHandshakeFill } from "react-icons/pi";
import { HiPlus } from "react-icons/hi2";


import useStudentsCrud from "../../configurations/crud/useStudentsCrud";
import useBookCrud from "../../configurations/crud/useBookCrud";
import useAllotmentCrud from "../../configurations/crud/useAllotmentCrud";

const pickList = (res) => {
  const d = res?.data;
  const list = d?.data ?? d?.result?.data ?? d?.items ?? [];
  return Array.isArray(list) ? list : [];
};

const fmtDate = (v) => {
  if (!v) return "-";
  const d = new Date(v);
  return isNaN(d)
    ? "-"
    : d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

export default function Dashboard() {
  const students = useStudentsCrud();
  const books = useBookCrud();
  const allotments = useAllotmentCrud();

  const [data, setData] = useState({ students: [], books: [], allotments: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const param = { pageNo: 1, pageSize: 1000 };
        const [s, b, a] = await Promise.all([
          students.GetAll(param),
          books.GetAll(param),
          allotments.GetAll(param),
        ]);
        setData({ students: pickList(s), books: pickList(b), allotments: pickList(a) });
      } finally {
        setLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categories = useMemo(() => {
    const map = {};
    data.books.forEach((b) => {
      const c = b.category?.trim() || "Uncategorised";
      map[c] = (map[c] || 0) + 1;
    });
    return Object.entries(map).sort((x, y) => y[1] - x[1]).slice(0, 6);
  }, [data.books]);

  const maxCat = categories[0]?.[1] || 1;

  const recent = useMemo(
    () =>
      [...data.allotments]
        .sort((x, y) => new Date(y.onDate) - new Date(x.onDate))
        .slice(0, 6),
    [data.allotments]
  );

  const stats = [
    { label: "Students", value: data.students.length, icon: PiStudentFill, to: "/students" },
    { label: "Books in library", value: data.books.length, icon: PiBooksFill, to: "/books" },
    { label: "Books allotted", value: data.allotments.length, icon: PiHandshakeFill, to: "/allotments" },
  ];

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className=" pt-24 md:pt-28 px-4 md:px-8 pb-8 max-w-6xl mx-auto text-slate-800">
      {/* Heading */}
      <div className=" flex flex-wrap items-end justify-between  gap-3 mb-8">
        <div>
          <p className="text-sm text-slate-500">{today}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-teal-900 tracking-tight">
            Library desk
          </h1>
        </div>
        <Link
          to="/allotments/add"
          className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-teal-950 font-semibold px-5 py-2.5 rounded-lg transition"
        >
          <HiPlus className="w-5 h-5" /> New allotment
        </Link>
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 bg-teal-900 text-white rounded-2xl overflow-hidden">
        {stats.map(({ label, value, icon: Icon, to }, i) => (
          <Link
            key={label}
            to={to}
            className={`flex items-center justify-between p-6 hover:bg-teal-800 transition ${
              i > 0 ? "md:border-l border-t md:border-t-0 border-teal-700" : ""
            }`}
          >
            <div>
              <p className="text-teal-200 text-sm">{label}</p>
              <p className="text-5xl font-bold mt-1 tabular-nums">{loading ? "-" : value}</p>
            </div>
            <Icon className="w-12 h-12 text-amber-300" />
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
        {/* Recent allotments */}
        <section className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-teal-900">Recent allotments</h2>
            <Link to="/allotments" className="text-sm text-teal-700 hover:underline">
              View all
            </Link>
          </div>

          {loading ? (
            <p className="text-slate-500 text-sm py-6">Loading...</p>
          ) : recent.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-slate-500 mb-3">No allotments yet.</p>
              <Link to="/allotments/add" className="text-teal-700 font-medium hover:underline">
                Add the first allotment
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500 border-b border-slate-200">
                    <th className="py-2 pr-3 font-medium">Student</th>
                    <th className="py-2 pr-3 font-medium">Book</th>
                    <th className="py-2 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((a, i) => (
                    <tr key={a.id ?? i} className="border-b border-slate-100 last:border-0">
                      <td className="py-3 pr-3 font-medium">
                        {a.studentData?.name ?? a.student?.name ?? `Id ${a.studentId ?? "-"}`}
                      </td>
                      <td className="py-3 pr-3">
                        {a.bookData?.name ?? a.bookdata?.name ?? a.book?.name ?? `Id ${a.bookId ?? "-"}`}
                      </td>
                      <td className="py-3 text-slate-500 whitespace-nowrap">
                        {fmtDate(a.onDate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Books by category */}
        <section className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5">
          <h2 className="text-lg font-semibold text-teal-900 mb-4">Books by category</h2>
          {loading ? (
            <p className="text-slate-500 text-sm py-6">Loading...</p>
          ) : categories.length === 0 ? (
            <p className="text-slate-500 text-sm py-6">Add books to see the category split.</p>
          ) : (
            <ul className="space-y-4">
              {categories.map(([name, count]) => (
                <li key={name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{name}</span>
                    <span className="text-slate-500 tabular-nums">{count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full bg-amber-400"
                      style={{ width: `${(count / maxCat) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="grid grid-cols-2 gap-3 mt-8">
            <Link
              to="/students/add"
              className="text-center text-sm font-medium border border-teal-800 text-teal-900 hover:bg-teal-50 rounded-lg py-2.5 transition"
            >
              Add student
            </Link>
            <Link
              to="/books/add"
              className="text-center text-sm font-medium border border-teal-800 text-teal-900 hover:bg-teal-50 rounded-lg py-2.5 transition"
            >
              Add book
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}