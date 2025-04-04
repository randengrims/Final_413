import { useEffect, useState } from 'react';
import { Project } from '../types/Project';
import { useNavigate } from 'react-router-dom';
import { fetchProjects as fetchBooks } from '../api/ProjectsAPI';
import Pagination from './Pagination';

function ProjectList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Project[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories);
        setBooks(data.projects);
        setTotalPages(Math.ceil(data.totalNumProjects / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, selectedCategories]);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      {books.map((b) => (
        <div id="projectCard" className="card" key={b.projectId}>
          <h3 className="card-title">{b.projectName}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author: </strong>
                {b.projectType}
              </li>
              <li>
                <strong>Publisher: </strong>
                {b.projectRegionalProgram}
              </li>
              <li>
                <strong>ISBN: </strong>
                {b.projectImpact} Individuals Served
              </li>
              <li>
                <strong>Category: </strong>
                {b.projectPhase}
              </li>
              <li>
                <strong>Pages: </strong>
                {b.projectFunctionalityStatus}
              </li>
              <li>
                <strong>Price: </strong>
              </li>
            </ul>

            <button
              className="btn btn-success"
              onClick={() =>
                navigate(`/donate/${b.projectName}/${b.projectId}`)
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}

      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </>
  );
}

export default ProjectList;
