import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  items: {
    label: string;
    path?: string;
  }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="breadcrumb" className="my-3 px-3 py-2 bg-light rounded-pill d-inline-flex align-items-center shadow-sm border">
      <ol className="breadcrumb mb-0 d-flex align-items-center gap-2" style={{ listStyle: 'none', padding: 0 }}>
        <li className="breadcrumb-item d-flex align-items-center">
          <Link to="/" className="text-decoration-none text-dark fw-semibold" style={{ fontSize: '0.85rem' }}>Home</Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <ChevronRight size={12} className="text-muted" />
              <li className={`breadcrumb-item d-flex align-items-center ${isLast ? 'active text-muted' : ''}`} aria-current={isLast ? 'page' : undefined}>
                {isLast || !item.path ? (
                  <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{item.label}</span>
                ) : (
                  <Link to={item.path} className="text-decoration-none text-dark fw-semibold" style={{ fontSize: '0.85rem' }}>
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
