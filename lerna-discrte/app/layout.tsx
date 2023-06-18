import React, { ReactNode } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}


export default function Layout(props: LayoutProps) {
  return (
    <div>
      {props.children}
    </div>
  );
}
