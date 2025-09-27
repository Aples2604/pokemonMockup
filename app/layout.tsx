import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pokédex Explorer',
  description: 'Paginated Pokédex with type filtering, powered by the PokéAPI.'
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className="app-shell">{children}</body>
  </html>
);

export default RootLayout;
