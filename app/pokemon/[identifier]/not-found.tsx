import Link from 'next/link';

const PokemonNotFound = () => (
  <main className="pokemon-detail pokemon-detail--not-found">
    <h1>Không tìm thấy Pokémon · Pokémon not found</h1>
    <p>Pokémon bạn yêu cầu không tồn tại trong Pokédex. The Pokémon you requested does not exist in the Pokédex.</p>
    <Link className="pokemon-detail__back" href="/">
      ← Quay lại danh sách / Back to list
    </Link>
  </main>
);

export default PokemonNotFound;
