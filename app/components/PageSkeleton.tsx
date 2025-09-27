const PLACEHOLDER_COUNT = 6;

const PageSkeleton = () => (
  <main className="page" aria-busy="true">
      <header className="page__header">
        <div>
          <span className="skeleton skeleton--title" aria-hidden="true" />
          <span className="skeleton skeleton--subtitle" aria-hidden="true" />
        </div>
        <div className="page__actions" aria-hidden="true">
          <div className="locale-switcher">
            <span className="skeleton skeleton--meta" />
            <div className="locale-switcher__control">
              <span className="skeleton skeleton--select" />
            </div>
          </div>
          <div className="type-filter">
            <span className="skeleton skeleton--meta" />
            <div className="type-filter__control">
              <span className="skeleton skeleton--select" />
            </div>
          </div>
        </div>
      </header>

      <section className="page__meta" aria-hidden="true">
        <span className="skeleton skeleton--meta" />
      </section>

      <section className="pokemon-grid" aria-hidden="true">
        <div className="pokemon-grid__list" role="list">
          {Array.from({ length: PLACEHOLDER_COUNT }, (_, index) => (
            <article key={index} className="pokemon-card pokemon-card--loading" role="presentation">
              <span className="skeleton skeleton--id" />
              <div className="pokemon-card__image-wrapper">
                <span className="skeleton skeleton--image" />
              </div>
              <span className="skeleton skeleton--name" />
              <div className="pokemon-card__types">
                <span className="skeleton skeleton--pill" />
                <span className="skeleton skeleton--pill" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <nav className="pagination" aria-hidden="true">
        <div className="pagination__controls">
          <span className="skeleton skeleton--button" />
          <ul className="pagination__list">
            {Array.from({ length: 3 }, (_, index) => (
              <li key={index}>
                <span className="skeleton skeleton--page" />
              </li>
            ))}
          </ul>
          <span className="skeleton skeleton--button" />
        </div>
        <p className="pagination__summary">
          <span className="skeleton skeleton--meta" />
        </p>
      </nav>
    </main>
);

export default PageSkeleton;
