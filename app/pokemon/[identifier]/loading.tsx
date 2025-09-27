const PokemonDetailLoading = () => (
  <main className="pokemon-detail" aria-busy="true">
    <span className="pokemon-detail__back skeleton skeleton--button" aria-hidden="true" />
    <section className="pokemon-detail__hero" aria-hidden="true">
      <div className="pokemon-detail__image">
        <span className="skeleton" style={{ width: '220px', height: '220px', borderRadius: '50%' }} />
      </div>
      <div className="pokemon-detail__summary">
        <span className="skeleton skeleton--id" />
        <span className="skeleton skeleton--title" />
        <span className="skeleton skeleton--subtitle" />
        <div className="pokemon-detail__types">
          <span className="skeleton skeleton--pill" />
          <span className="skeleton skeleton--pill" />
        </div>
        <div className="pokemon-detail__stats">
          <span className="skeleton skeleton--meta" />
          <span className="skeleton skeleton--meta" />
          <span className="skeleton skeleton--meta" />
        </div>
      </div>
    </section>
    <section className="pokemon-detail__content" aria-hidden="true">
      <div className="pokemon-detail__panel">
        <span className="skeleton skeleton--meta" style={{ width: '140px' }} />
        <span className="skeleton skeleton--meta" />
        <span className="skeleton skeleton--meta" />
      </div>
      <div className="pokemon-detail__panel">
        <span className="skeleton skeleton--meta" style={{ width: '160px' }} />
        <span className="skeleton skeleton--meta" />
        <span className="skeleton skeleton--meta" />
        <span className="skeleton skeleton--meta" />
      </div>
    </section>
  </main>
);

export default PokemonDetailLoading;
