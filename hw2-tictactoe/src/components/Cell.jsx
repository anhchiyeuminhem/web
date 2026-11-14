function Cell({ value }) {
  const playerClass = value ? value.toLowerCase() : '';

  return (
    <button className={`cell ${playerClass}`} type="button">
      {value}
    </button>
  );
}

export default Cell;