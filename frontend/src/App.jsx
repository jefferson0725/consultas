import { useState } from 'react';
import './App.css';

const API_BASE = '/reports';

const OPTIONS = [
  { key: 'top-customer', label: 'Cliente con más compras' },
  { key: 'total-per-customer', label: 'Total de compras por cliente' },
  { key: 'employees-per-office', label: 'Número de empleados por oficina' },
  { key: 'products-sold-per-line', label: 'Total productos vendidos por línea' },
  { key: 'product-lines', label: 'Listar líneas de producto' },
  { key: 'employees', label: 'Listar empleados' },
  { key: 'recent-sales', label: 'Últimas 10 ventas' },
];

function RenderTable({ data }) {
  if (!data) return null;
  const arr = Array.isArray(data) ? data : [data];
  if (arr.length === 0) return <div>No hay resultados</div>;
  const keys = Object.keys(arr[0]);
  return (
    <table>
      <thead>
        <tr>{keys.map(k => <th key={k}>{k}</th>)}</tr>
      </thead>
      <tbody>
        {arr.map((row, i) => (
          <tr key={i}>
            {keys.map(k => <td key={k + i}>{String(row[k] ?? '')}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function App() {
  const [selected, setSelected] = useState(OPTIONS[0].key);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  async function run() {
    setLoading(true);
    setErr('');
    setData(null);
    try {
      const res = await fetch(`${API_BASE}/${selected}`);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
      }
      const json = await res.json();
      setData(json);
    } catch (e) {
      setErr(e.message || 'Error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="App" style={{ padding: 20, maxWidth: 1000, margin: '0 auto' }}>
      <h1>Consultas</h1>
      <div style={{ marginBottom: 12 }}>
        <select value={selected} onChange={e => setSelected(e.target.value)} style={{ padding: 8 }}>
          {OPTIONS.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
        </select>
        <button onClick={run} style={{ marginLeft: 8, padding: '8px 12px' }}>Ejecutar</button>
      </div>

      {loading && <div>Consultando...</div>}
      {err && <div style={{ color: 'red' }}>{err}</div>}
      <RenderTable data={data} />
    </div>
  );
}