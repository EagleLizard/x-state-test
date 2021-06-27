
import './page.scss';
import React from 'react';

interface PageProps {
  children?: JSX.Element | JSX.Element[];
}

export function Page(props: PageProps) {
  return (
    <div className="app-page">
      {
        props.children
      }
    </div>
  );
}
