import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogData } from "../../redux/slice/blogSlice";
import { fetchNewsData } from "../../redux/slice/newsSlice";
import { toPng } from "html-to-image";
import download from "downloadjs";
import {
  FileDown,
  ImageIcon,
  FileSpreadsheet,
  IndianRupee,
  Info,
  Settings2,
} from "lucide-react";
import toast from "react-hot-toast";

const AdminPayout = () => {
  const dispatch = useDispatch();
  const { blogArticles } = useSelector((s) => s.blogs);
  const { articles } = useSelector((s) => s.news);

  const [rateBlog, setRateBlog] = useState("");
  const [rateNews, setRateNews] = useState("");

  const key = "payoutRates";

  useEffect(() => {
    dispatch(fetchBlogData());
    dispatch(fetchNewsData());

    const saved = JSON.parse(localStorage.getItem(key));
    if (saved) {
      setRateBlog(saved.blog || "");
      setRateNews(saved.news || "");
    }
  }, [dispatch]);

  const handleSaveRates = () => {
    localStorage.setItem(
      key,
      JSON.stringify({ blog: rateBlog, news: rateNews })
    );
    alert("✅ Payout rates saved!");
  };

  const blogCount = blogArticles?.length || 0;
  const newsCount = articles?.length || 0;
  const total = blogCount * (rateBlog || 0) + newsCount * (rateNews || 0);

  const exportCSV = () => {
    const blogSubtotal = blogCount * (rateBlog || 0);
    const newsSubtotal = newsCount * (rateNews || 0);
    const csvContent =
      "Type,Count,Rate,Subtotal\n" +
      `Blogs,${blogCount},${rateBlog},${blogSubtotal}\n` +
      `News,${newsCount},${rateNews},${newsSubtotal}\n` +
      `Total,,,${blogSubtotal + newsSubtotal}`;

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    download(blob, "payout_report.csv");
  };
  

  const exportPNG = () => {
    const node = document.getElementById("payout-summary");
    if (node) {
      toPng(node).then((dataUrl) => {
        download(dataUrl, "payout_summary.png");
      });
    }
  };
  const openGoogleSheets = () => {
    const url = "https://docs.google.com/spreadsheets/create?usp=sheets_home";
    toast.success("Opening Google Sheets...", { position: "top-right" });
    window.open(url, "_blank");
  };
  
  

  return (
    <div className="max-w-7xl mx-auto  bg-white rounded-2xl shadow-xl p-6 md:p-10 space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-2">
            <IndianRupee className="w-7 h-7" />
            Payout Calculator (Admin Panel)
          </h1>
          <p className="text-gray-600 text-sm">
            Set article/blog rates, calculate totals, and export payout reports.
          </p>
        </div>
        <button
          onClick={handleSaveRates}
          className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
        >
          <Settings2 className="w-4 h-4" />
          Save Rates
        </button>
      </div>

      {/* Info Box */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-start gap-3 text-sm text-gray-700">
        <Info className="text-indigo-600 mt-0.5" />
        <p>
          Total payout is calculated by multiplying the number of articles/blogs
          with their respective rates. Make sure rates are saved before
          exporting.
        </p>
      </div>

      {/* Input Rates */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Blog Article Rate (₹)
          </label>
          <input
            type="number"
            value={rateBlog}
            onChange={(e) => setRateBlog(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
            placeholder="e.g., 100"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            News Article Rate (₹)
          </label>
          <input
            type="number"
            value={rateNews}
            onChange={(e) => setRateNews(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
            placeholder="e.g., 50"
          />
        </div>
      </div>

      {/* Summary Table */}
      <div
        id="payout-summary"
        className="overflow-x-auto bg-white border border-gray-200 rounded-lg"
      >
        <table className="w-full min-w-[400px] text-left text-sm">
          <thead className="bg-indigo-100 text-indigo-700">
            <tr>
              <th className="p-3 border">Type</th>
              <th className="p-3 border">Count</th>
              <th className="p-3 border">Rate (₹)</th>
              <th className="p-3 border">Subtotal (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border">Blogs</td>
              <td className="p-3 border">{blogCount}</td>
              <td className="p-3 border">{rateBlog || 0}</td>
              <td className="p-3 border">{blogCount * (rateBlog || 0)}</td>
            </tr>
            <tr>
              <td className="p-3 border">News</td>
              <td className="p-3 border">{newsCount}</td>
              <td className="p-3 border">{rateNews || 0}</td>
              <td className="p-3 border">{newsCount * (rateNews || 0)}</td>
            </tr>
            <tr className="font-bold bg-indigo-50 text-indigo-800">
              <td className="p-3 border">Total</td>
              <td className="p-3 border"></td>
              <td className="p-3 border"></td>
              <td className="p-3 border">{total}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Export Buttons */}
      <div className="flex flex-wrap gap-4 pt-2">
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          <FileSpreadsheet className="w-4 h-4" />
          Export CSV
        </button>
        <button
          onClick={exportPNG}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <ImageIcon className="w-4 h-4" />
          Export PNG
        </button>
        <button
          onClick={openGoogleSheets}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          <FileDown className="w-4 h-4" />
          Open Google Sheets
        </button>
      </div>
    </div>
  );
};

export default AdminPayout;
