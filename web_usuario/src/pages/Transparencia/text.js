let trimestreCategoria, trimestreShowed;
if (trimestre === 'anual') {
  trimestreCategoria = 'Cuenta Pública';
  trimestreShowed = 'Cuenta Publica';
} else if (trimestre === 'reglamento') {
  trimestreCategoria = 'Reglamento';
  trimestreShowed = 'Reglamento';
} else {
  trimestreCategoria = trimestre; // Dejar el valor como está si es un número
  trimestreShowed = 'Trimestre ' + trimestre;
}

