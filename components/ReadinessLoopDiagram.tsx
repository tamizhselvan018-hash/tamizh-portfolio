import React from 'react';
import { motion } from 'motion/react';

type NodeVariant = 'default' | 'match' | 'ready' | 'blocked';

interface DiagramNode {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  variant?: NodeVariant;
}

const NODES: DiagramNode[] = [
  { x: 30, y: 28, w: 240, h: 68, title: 'Production order', sub: 'customer · pump model · quantity' },
  { x: 330, y: 28, w: 240, h: 68, title: 'Required parts', sub: 'bill of materials × quantity' },
  { x: 30, y: 176, w: 240, h: 68, title: 'Inventory on hand', sub: 'live stock, not a stored count' },
  { x: 330, y: 176, w: 240, h: 68, title: 'Required vs on hand', sub: 're-evaluated on every change', variant: 'match' },
  { x: 650, y: 112, w: 200, h: 68, title: 'Ready to build', sub: 'every part available', variant: 'ready' },
  { x: 650, y: 288, w: 200, h: 68, title: 'Blocked', sub: 'names the exact shortfall', variant: 'blocked' },
  { x: 910, y: 28, w: 200, h: 68, title: 'Release to floor', sub: 'components consumed' },
  { x: 910, y: 140, w: 200, h: 56, title: 'In production' },
  { x: 910, y: 252, w: 200, h: 56, title: 'Finished' },
  { x: 650, y: 420, w: 200, h: 68, title: 'Purchase request', sub: 'supplier · lead time' },
  { x: 330, y: 420, w: 240, h: 68, title: 'Receive shipment', sub: 'partial or full' },
];

// Drawn in narrative order so the loop reads left-to-right, then back around.
const CONNECTORS: string[] = [
  'M270 62 H322',
  'M450 96 V168',
  'M270 210 H322',
  'M570 210 H610 V146 H642',
  'M570 210 H610 V322 H642',
  'M850 146 H880 V62 H902',
  'M1010 96 V132',
  'M1010 196 V244',
  'M750 356 V412',
  'M650 454 H578',
  'M330 454 H150 V252',
];

const VARIANT_STYLES: Record<NodeVariant, { fill: string; stroke: string; title: string; sub: string }> = {
  default: { fill: '#ffffff', stroke: '#e4e4e7', title: '#18181b', sub: '#71717a' },
  match: { fill: '#1E3A8A', stroke: '#1E3A8A', title: '#ffffff', sub: '#bfdbfe' },
  ready: { fill: '#ffffff', stroke: '#a7f3d0', title: '#059669', sub: '#71717a' },
  blocked: { fill: '#ffffff', stroke: '#fecaca', title: '#dc2626', sub: '#71717a' },
};

export const ReadinessLoopDiagram: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="space-y-6 p-6 md:p-10 rounded-3xl border border-zinc-200 bg-white shadow-sm"
  >
    <div className="space-y-2">
      <span className="text-[10px] font-mono text-red-500 font-extrabold uppercase tracking-widest block">
        The Mechanism
      </span>
      <h3 className="text-2xl md:text-3xl font-extrabold text-zinc-900 tracking-tight">
        How the tool knows what's buildable
      </h3>
      <p className="text-sm md:text-base text-zinc-500 font-light max-w-3xl leading-relaxed">
        An order's status is never typed in by anyone. Every order carries a bill of materials; multiply it by the
        run quantity and you have what that order needs. The tool compares that against live stock and derives one
        of two answers — buildable, or blocked on these specific parts. The consequence matters more than the
        mechanism: when a shipment lands and stock goes up, every order it unblocks clears by itself. Nobody has to
        remember to update a status, so no status can be stale.
      </p>
    </div>

    <div className="overflow-x-auto no-scrollbar -mx-2 px-2">
      <svg
        viewBox="0 0 1140 500"
        role="img"
        aria-label="Diagram: a production order's bill of materials is compared against inventory on hand to derive ready or blocked; blocked orders create purchase requests, and receiving stock feeds back into inventory."
        className="w-full min-w-[880px] h-auto font-sans"
      >
        <defs>
          <marker id="par-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#a1a1aa" />
          </marker>
        </defs>

        {CONNECTORS.map((d, idx) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke="#a1a1aa"
            strokeWidth={1.75}
            markerEnd="url(#par-arrow)"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.35 + idx * 0.07, ease: 'easeInOut' }}
          />
        ))}

        <text x={162} y={352} fill="#a1a1aa" fontSize={11} className="font-mono">
          stock goes up
        </text>

        {NODES.map((node, idx) => {
          const style = VARIANT_STYLES[node.variant ?? 'default'];
          const singleLine = !node.sub;

          return (
            <motion.g
              key={node.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
            >
              <rect
                x={node.x}
                y={node.y}
                width={node.w}
                height={node.h}
                rx={14}
                fill={style.fill}
                stroke={style.stroke}
                strokeWidth={1.5}
              />
              <text
                x={node.x + 20}
                y={node.y + (singleLine ? node.h / 2 + 5 : 30)}
                fill={style.title}
                fontSize={15}
                fontWeight={650}
              >
                {node.title}
              </text>
              {node.sub && (
                <text x={node.x + 20} y={node.y + 51} fill={style.sub} fontSize={12.5} fontWeight={300}>
                  {node.sub}
                </text>
              )}
            </motion.g>
          );
        })}
      </svg>
    </div>

    <p className="text-[11px] text-zinc-400 font-mono leading-normal">
      No one sets a status by hand. Receiving stock re-runs the match, and every order it unblocks clears on its own.
    </p>
  </motion.div>
);

export default ReadinessLoopDiagram;
