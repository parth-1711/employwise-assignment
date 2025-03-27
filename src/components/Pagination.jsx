const Pagination = ({ page, setPage }) => {
  return (
    <div className="flex justify-center mt-6 space-x-4">
      <button onClick={() => setPage(page - 1)} disabled={page === 1} className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50">Previous</button>
      <span className="text-lg font-semibold"> Page {page} </span>
      <button onClick={() => setPage(page + 1)} className="px-4 py-2 bg-gray-300 rounded-lg">Next</button>
    </div>
  );
};

export default Pagination;
