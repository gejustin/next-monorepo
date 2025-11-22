import { ClientModule } from "./client-module";

export async function Module() {
  const shapes = [
    { id: 'circle', name: 'Circle', sides: 0, color: 'bg-red-500', description: 'A round shape with no corners.' },
    { id: 'square', name: 'Square', sides: 4, color: 'bg-blue-500', description: 'A shape with 4 equal sides and 4 corners.' },
    { id: 'triangle', name: 'Triangle', sides: 3, color: 'bg-green-500', description: 'A shape with 3 sides and 3 corners.' },
    { id: 'rectangle', name: 'Rectangle', sides: 4, color: 'bg-yellow-500', description: 'A shape with 4 sides and 4 corners, with opposite sides equal.' },
  ];

  return <ClientModule shapes={shapes} />;
}
