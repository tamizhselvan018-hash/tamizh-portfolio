import React, { useState } from 'react';
import { 
  Lock, Search, Filter, Calendar, User, Check, ChevronRight, 
  ArrowRight, FileText, Layers, Zap, Clipboard, RotateCcw, AlertCircle
} from 'lucide-react';

// Custom Geometric PAR Logo
export const ParLogo: React.FC = () => {
  return (
    <div className="flex items-center gap-1.5 select-none" id="par-logo">
      <div className="flex flex-col gap-[2px]">
        <div className="w-6 h-[5px] bg-[#0A192F] rounded-sm"></div>
        <div className="w-6 h-[5px] bg-[#3B82F6] rounded-sm"></div>
        <div className="w-6 h-[5px] bg-[#1E3A8A] rounded-sm"></div>
      </div>
      <span className="text-[13px] font-black font-sans tracking-widest text-[#0A192F]">PAR</span>
    </div>
  );
};

// Common Sidebar component for all mockups
interface SidebarProps {
  activeTab: 'dashboard' | 'orders' | 'inventory' | 'purchasing' | 'requests';
  onTabChange?: (tab: 'dashboard' | 'orders' | 'inventory' | 'purchasing' | 'requests') => void;
}

export const MockSidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'orders', label: 'Orders' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'purchasing', label: 'Purchasing' },
    { id: 'requests', label: 'Requests' }
  ];

  return (
    <div className="w-40 border-r border-zinc-200 bg-white p-4 flex flex-col justify-between shrink-0 select-none text-[11px]" id="mock-sidebar">
      <div className="space-y-6">
        <ParLogo />
        
        <div className="space-y-4">
          <div>
            <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest block mb-2">MAIN</span>
            <div className="space-y-1">
              {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange && onTabChange(item.id as any)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg font-medium transition-all ${
                      isActive 
                        ? 'bg-zinc-950 text-white font-semibold' 
                        : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-zinc-100 flex items-center gap-2 text-zinc-400">
        <div className="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center text-[9px] font-bold">U</div>
        <span className="text-[9px] font-mono truncate">Operator 01</span>
      </div>
    </div>
  );
};

// Header template for all screens
interface HeaderProps {
  title: string;
}

export const MockHeader: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-150 bg-white" id="mock-header">
      <h2 className="text-base font-bold text-zinc-900 tracking-tight font-sans">{title}</h2>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 px-2.5 py-1 bg-white border border-zinc-200 rounded-lg text-[10px] text-zinc-500 font-mono">
          <Calendar className="w-3 h-3 text-zinc-400" />
          <span>Jun 12, 2026</span>
        </div>
        <div className="flex items-center gap-1 px-2.5 py-1 bg-white border border-zinc-200 rounded-lg text-[10px] text-zinc-600 font-semibold">
          <span>Manager</span>
        </div>
      </div>
    </div>
  );
};

// SCREEN 1: Mock Dashboard Layout
export const MockDashboard: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const [selectedOrder, setSelectedOrder] = useState('PO-1069');

  const orders = [
    { id: 'PO-1051', pump: 'Pump B-20', date: 'Jun 14, 2026', status: 'In production' },
    { id: 'PO-1057', pump: 'Pump C-05', date: 'Jun 18, 2026', status: 'In production' },
    { id: 'PO-1069', pump: 'Pump D-10', date: 'Jun 25, 2026', status: 'In production' },
    { id: 'PO-1062', pump: 'Pump A-12', date: 'Jun 21, 2026', status: 'Ready' },
    { id: 'PO-1064', pump: 'Pump D-10', date: 'Jun 24, 2026', status: 'Ready' }
  ];

  const activeOrderDetail = orders.find(o => o.id === selectedOrder) || orders[2];

  return (
    <div className="flex bg-[#F8F9FA] w-full h-[440px] text-[11px] overflow-hidden rounded-b-3xl" id="mock-dashboard-wrapper">
      <MockSidebar activeTab="dashboard" onTabChange={onTabChange} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <MockHeader title="Dashboard" />
        
        {/* Scrollable Dashboard Body */}
        <div className="flex-1 p-5 space-y-4 overflow-y-auto">
          {/* Stat Cards Grid */}
          <div className="grid grid-cols-4 gap-3.5">
            <div className="bg-white p-3 rounded-xl border border-zinc-150 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-1">
              <span className="text-[9px] font-medium text-zinc-400 uppercase tracking-wider block">In production</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-zinc-900 leading-none">3</span>
                <span className="text-[9px] text-zinc-400">active</span>
              </div>
              <p className="text-[9px] text-zinc-450 leading-tight">Currently being built</p>
            </div>

            <div className="bg-white p-3 rounded-xl border border-zinc-150 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-1">
              <span className="text-[9px] font-medium text-zinc-400 uppercase tracking-wider block">Ready</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-zinc-900 leading-none">2</span>
                <span className="text-[9px] text-zinc-400">orders</span>
              </div>
              <p className="text-[9px] text-zinc-450 leading-tight font-light">Can start production</p>
            </div>

            <div className="bg-white p-3 rounded-xl border-l-[3px] border-l-red-500 border-zinc-150 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-1">
              <span className="text-[9px] font-medium text-zinc-400 uppercase tracking-wider block">Blocked</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-zinc-900 leading-none">2</span>
                <span className="text-[9px] text-red-500 font-semibold">needs care</span>
              </div>
              <p className="text-[9px] text-zinc-450 leading-tight">Need inventory action</p>
            </div>

            <div className="bg-white p-3 rounded-xl border border-zinc-150 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-1">
              <span className="text-[9px] font-medium text-zinc-400 uppercase tracking-wider block">Purchase requests pending</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-zinc-900 leading-none">2</span>
                <span className="text-[9px] text-zinc-400">pending</span>
              </div>
              <p className="text-[9px] text-zinc-450 leading-tight">Awaiting receipt</p>
            </div>
          </div>

          {/* Table & Sidebar Detail Grid */}
          <div className="grid grid-cols-12 gap-4">
            {/* Table Area (8 cols) */}
            <div className="col-span-8 bg-white border border-zinc-200 rounded-xl overflow-hidden p-4 space-y-3 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-zinc-950 text-xs tracking-tight">Production Orders</h3>
                  <p className="text-[10px] text-zinc-400 font-light">Active orders sorted by current production status</p>
                </div>
                <span className="text-[9px] font-mono text-zinc-400">5 SHOWN</span>
              </div>

              {/* Table */}
              <div className="border border-zinc-150 rounded-lg overflow-hidden">
                <table className="w-full text-left text-[10px]">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-150 text-[8px] font-mono text-zinc-400 uppercase tracking-wider">
                      <th className="p-2 font-bold">Order ID</th>
                      <th className="p-2">Pump model</th>
                      <th className="p-2">Required date</th>
                      <th className="p-2 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => {
                      const isSelected = order.id === selectedOrder;
                      return (
                        <tr 
                          key={order.id} 
                          onClick={() => setSelectedOrder(order.id)}
                          className={`border-b border-zinc-100 last:border-none cursor-pointer transition-colors ${
                            isSelected ? 'bg-blue-50/50 border-l-2 border-l-blue-500 pl-1' : 'hover:bg-zinc-50/50'
                          }`}
                        >
                          <td className="p-2 font-mono font-bold text-zinc-800">{order.id}</td>
                          <td className="p-2 font-medium text-zinc-700">{order.pump}</td>
                          <td className="p-2 text-zinc-500 font-light">{order.date}</td>
                          <td className="p-2 text-right">
                            <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-bold ${
                              order.status === 'Ready' 
                                ? 'bg-green-50 text-green-700 border border-green-100' 
                                : 'bg-orange-50 text-orange-700 border border-orange-100'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center pt-1">
                <button 
                  onClick={() => onTabChange && onTabChange('orders')}
                  className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[9px] font-bold transition-colors cursor-pointer"
                >
                  View production orders
                </button>
                <span className="text-[9px] font-mono text-zinc-400">In production shown first</span>
              </div>
            </div>

            {/* Side summary panel (4 cols) */}
            <div className="col-span-4 bg-white border border-zinc-200 rounded-xl p-4 space-y-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="space-y-0.5">
                  <h3 className="font-bold text-zinc-900 text-xs">Order Summary</h3>
                  <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Selected order: {activeOrderDetail.id}</p>
                </div>

                <div className="border-t border-zinc-100 pt-3 space-y-2.5">
                  <div className="space-y-0.5">
                    <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider block">Pump Model</span>
                    <span className="font-bold text-zinc-800 text-[11px] block">{activeOrderDetail.pump}</span>
                  </div>
                  
                  <div className="space-y-0.5">
                    <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider block">Status</span>
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-bold ${
                      activeOrderDetail.status === 'Ready' 
                        ? 'bg-green-50 text-green-700 border border-green-100' 
                        : 'bg-orange-50 text-orange-700 border border-orange-100'
                    }`}>
                      {activeOrderDetail.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-0.5">
                      <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider block">Ordered Date</span>
                      <span className="font-medium text-zinc-650 text-[10px]">Jun 14, 2026</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider block">Required Date</span>
                      <span className="font-medium text-zinc-650 text-[10px]">{activeOrderDetail.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-100 text-[8px] font-mono text-zinc-400">
                Press side menu tabs to navigate screens.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// SCREEN 2: Mock Production Orders Layout
export const MockOrders: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const [selectedOrder, setSelectedOrder] = useState('PO-1048');

  const ordersList = [
    { id: 'PO-1048', pump: 'Pump A-12', qty: 12, date: 'Jun 12, 2026', status: 'Blocked', client: 'Northfield Waterworks', ordered: 'Jun 8, 2026', notes: 'Priority replacement order for site maintenance.' },
    { id: 'PO-1051', pump: 'Pump B-20', qty: 6, date: 'Jun 14, 2026', status: 'In production', client: 'HydroCorp Ltd', ordered: 'Jun 10, 2026', notes: 'Standard fulfillment run.' },
    { id: 'PO-1057', pump: 'Pump C-05', qty: 18, date: 'Jun 18, 2026', status: 'In production', client: 'Global Valves Inc', ordered: 'Jun 11, 2026', notes: 'Bulk batch order.' },
    { id: 'PO-1062', pump: 'Pump A-12', qty: 8, date: 'Jun 21, 2026', status: 'Ready', client: 'Apex Hydraulics', ordered: 'Jun 12, 2026', notes: 'Fulfillment queue clean-up.' },
    { id: 'PO-1064', pump: 'Pump D-10', qty: 4, date: 'Jun 24, 2026', status: 'Ready', client: 'Vertex Stations', ordered: 'Jun 12, 2026', notes: 'Express line shipment.' },
    { id: 'PO-1069', pump: 'Pump D-10', qty: 5, date: 'Jun 25, 2026', status: 'In production', client: 'Apex Hydraulics', ordered: 'Jun 14, 2026', notes: 'Standard cycle run.' },
    { id: 'PO-1068', pump: 'Pump B-20', qty: 10, date: 'Jun 28, 2026', status: 'Blocked', client: 'Waterways LLC', ordered: 'Jun 15, 2026', notes: 'Requires premium custom impellers.' }
  ];

  const activeOrder = ordersList.find(o => o.id === selectedOrder) || ordersList[0];

  return (
    <div className="flex bg-[#F8F9FA] w-full h-[440px] text-[11px] overflow-hidden rounded-b-3xl" id="mock-orders-wrapper">
      <MockSidebar activeTab="orders" onTabChange={onTabChange} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <MockHeader title="Production Orders" />
        
        <div className="flex-1 p-4 flex gap-4 overflow-hidden">
          {/* Main order table area (8 cols) */}
          <div className="w-2/3 bg-white border border-zinc-200 rounded-xl p-4 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="space-y-3 overflow-hidden flex-1 flex flex-col">
              <div className="flex justify-between items-center shrink-0">
                <div>
                  <h3 className="font-bold text-zinc-950 text-xs tracking-tight">Order List</h3>
                  <p className="text-[10px] text-zinc-400 font-light">Search and filter active production orders</p>
                </div>
                <button className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[9px] font-bold transition-colors shrink-0">
                  Create production order
                </button>
              </div>

              {/* Filters row */}
              <div className="grid grid-cols-4 gap-2 bg-zinc-50 p-2 border border-zinc-150 rounded-lg items-center text-[9px] shrink-0">
                <div className="flex items-center gap-1.5 bg-white border border-zinc-200 px-2 py-1 rounded w-full">
                  <Search className="w-2.5 h-2.5 text-zinc-400 shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Search by order ID..." 
                    className="bg-transparent border-none outline-none text-[9px] w-full placeholder-zinc-350"
                    disabled
                  />
                </div>
                <div className="bg-white border border-zinc-200 px-2 py-1 rounded flex justify-between items-center text-zinc-600">
                  <span>Status: All</span>
                  <ChevronRight className="w-2.5 h-2.5 text-zinc-400 rotate-90" />
                </div>
                <div className="bg-white border border-zinc-200 px-2 py-1 rounded flex justify-between items-center text-zinc-600">
                  <span>Model: All</span>
                  <ChevronRight className="w-2.5 h-2.5 text-zinc-400 rotate-90" />
                </div>
                <button className="text-blue-600 hover:text-blue-800 font-semibold border border-blue-100 hover:border-blue-200 bg-blue-50/40 rounded py-1 transition-all">
                  Reset filters
                </button>
              </div>

              {/* Table wrapper with scroll */}
              <div className="border border-zinc-150 rounded-lg overflow-y-auto flex-1">
                <table className="w-full text-left text-[10px] relative">
                  <thead className="sticky top-0 bg-zinc-50 z-10">
                    <tr className="border-b border-zinc-150 text-[8px] font-mono text-zinc-400 uppercase tracking-wider">
                      <th className="p-2 font-bold">Order ID</th>
                      <th className="p-2">Pump model</th>
                      <th className="p-2 text-center">Quantity</th>
                      <th className="p-2">Required date</th>
                      <th className="p-2 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersList.map((order) => {
                      const isSelected = order.id === selectedOrder;
                      return (
                        <tr 
                          key={order.id} 
                          onClick={() => setSelectedOrder(order.id)}
                          className={`border-b border-zinc-100 last:border-none cursor-pointer transition-colors ${
                            isSelected ? 'bg-blue-50/50 border-l-2 border-l-blue-500 pl-1' : 'hover:bg-zinc-50/50'
                          }`}
                        >
                          <td className="p-2 font-mono font-bold text-zinc-800">{order.id}</td>
                          <td className="p-2 font-medium text-zinc-700">{order.pump}</td>
                          <td className="p-2 text-center text-zinc-600">{order.qty}</td>
                          <td className="p-2 text-zinc-500 font-light">{order.date}</td>
                          <td className="p-2 text-right">
                            <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-bold ${
                              order.status === 'Ready' 
                                ? 'bg-green-50 text-green-700 border border-green-100' 
                                : order.status === 'Blocked'
                                ? 'bg-red-50 text-red-700 border border-red-100'
                                : 'bg-orange-50 text-orange-700 border border-orange-100'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-zinc-100 pt-2 shrink-0 text-[9px] text-zinc-400 font-mono">
              <span>Rows per page: 25</span>
              <span>1-7 of 7</span>
            </div>
          </div>

          {/* Sidebar Detail (4 cols) */}
          <div className="w-1/3 bg-white border border-zinc-200 rounded-xl p-4 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="space-y-3 overflow-y-auto pr-1">
              <div className="space-y-0.5 border-b border-zinc-100 pb-2">
                <h3 className="font-bold text-zinc-900 text-xs">Order Detail</h3>
                <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Selected order: {activeOrder.id}</p>
              </div>

              <div className="space-y-2.5">
                <div className="space-y-0.5">
                  <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider block">Customer</span>
                  <span className="font-bold text-zinc-800 text-[11px] block truncate">{activeOrder.client}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider block">Pump Model</span>
                    <span className="font-semibold text-zinc-750 text-[10px] block">{activeOrder.pump}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider block">Quantity</span>
                    <span className="font-semibold text-zinc-750 text-[10px] block">{activeOrder.qty} units</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider block">Ordered Date</span>
                    <span className="text-zinc-650 text-[10px] block">{activeOrder.ordered}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider block">Required Date</span>
                    <span className="text-zinc-650 text-[10px] block font-medium">{activeOrder.date}</span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider block">Status</span>
                  <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-bold ${
                    activeOrder.status === 'Ready' 
                      ? 'bg-green-50 text-green-700 border border-green-100' 
                      : activeOrder.status === 'Blocked'
                      ? 'bg-red-50 text-red-700 border border-red-100'
                      : 'bg-orange-50 text-orange-700 border border-orange-100'
                  }`}>
                    {activeOrder.status}
                  </span>
                </div>

                <div className="space-y-0.5 bg-zinc-50 p-2 border border-zinc-150 rounded-lg">
                  <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider block mb-0.5">Notes</span>
                  <span className="text-[9px] text-zinc-600 leading-tight block">{activeOrder.notes}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-100 shrink-0">
              {activeOrder.status === 'Blocked' ? (
                <div className="bg-red-50/50 border border-red-100 text-red-800 p-2 rounded-lg text-[9px] leading-tight space-y-1">
                  <span className="font-bold uppercase tracking-wider block text-[8px]">Status action</span>
                  <span>This order is blocked until missing inventory is resolved.</span>
                </div>
              ) : (
                <div className="bg-emerald-50/50 border border-emerald-100 text-emerald-800 p-2 rounded-lg text-[9px] leading-tight space-y-1">
                  <span className="font-bold uppercase tracking-wider block text-[8px]">Status action</span>
                  <span>This order is cleared for floor assembly picking.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// SCREEN 3: Mock Component Inventory Layout
export const MockInventory: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const [selectedItem, setSelectedItem] = useState('Seal Kit SK-08');

  const inventoryItems = [
    { name: 'Seal Kit SK-08', cat: 'Component', onHand: 4, minStock: 20, status: 'Low stock', shortage: '8 units needed for PO-1048', related: 'PO-1048 needs 12 units, PO-1057 may need 18 units' },
    { name: 'Bearing BR-02', cat: 'Component', onHand: 0, minStock: 12, status: 'Out of stock', shortage: '10 units needed for PO-1068', related: 'PO-1068 needs 10 units' },
    { name: 'Impeller 4in', cat: 'Component', onHand: 9, minStock: 30, status: 'Low stock', shortage: '18 units needed for PO-1057', related: 'PO-1057 needs 27 units' },
    { name: 'Motor Housing', cat: 'Component', onHand: 14, minStock: 10, status: 'In stock', shortage: 'No current shortages', related: 'Fully satisfied active demand' },
    { name: 'Fastener Set FS-20', cat: 'Component', onHand: 30, minStock: 25, status: 'In stock', shortage: 'No current shortages', related: 'Fully satisfied active demand' },
    { name: 'Shaft Assembly', cat: 'Component', onHand: 16, minStock: 10, status: 'In stock', shortage: 'No current shortages', related: 'Fully satisfied active demand' },
    { name: 'Mechanical Seal', cat: 'Component', onHand: 6, minStock: 14, status: 'Low stock', shortage: '3 units needed for PO-1069', related: 'PO-1069 needs 9 units' },
    { name: 'O-Ring Set', cat: 'Component', onHand: 0, minStock: 18, status: 'Out of stock', shortage: '8 units needed for PO-1074', related: 'PO-1074 needs 8 units' }
  ];

  const activeItem = inventoryItems.find(i => i.name === selectedItem) || inventoryItems[0];

  return (
    <div className="flex bg-[#F8F9FA] w-full h-[440px] text-[11px] overflow-hidden rounded-b-3xl" id="mock-inventory-wrapper">
      <MockSidebar activeTab="inventory" onTabChange={onTabChange} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <MockHeader title="Inventory" />
        
        <div className="flex-1 p-4 flex gap-4 overflow-hidden">
          {/* Inventory table (8 cols) */}
          <div className="w-2/3 bg-white border border-zinc-200 rounded-xl p-4 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="space-y-3 overflow-hidden flex-1 flex flex-col">
              <div className="flex justify-between items-center shrink-0">
                <div>
                  <h3 className="font-bold text-zinc-950 text-xs tracking-tight">Component Inventory</h3>
                  <p className="text-[10px] text-zinc-400 font-light">Search and inspect current shop-floor bin counts</p>
                </div>
                <span className="text-[9px] font-mono text-zinc-400">10 COMPONENTS</span>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-3 gap-2 bg-zinc-50 p-2 border border-zinc-150 rounded-lg items-center text-[9px] shrink-0">
                <div className="col-span-1.5 flex items-center gap-1.5 bg-white border border-zinc-200 px-2 py-1 rounded w-full">
                  <Search className="w-2.5 h-2.5 text-zinc-400 shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Search by item name or part..." 
                    className="bg-transparent border-none outline-none text-[9px] w-full"
                    disabled
                  />
                </div>
                <div className="bg-white border border-zinc-200 px-2 py-1 rounded flex justify-between items-center text-zinc-600">
                  <span>Stock: All</span>
                  <ChevronRight className="w-2.5 h-2.5 text-zinc-400 rotate-90" />
                </div>
                <button className="text-blue-600 hover:text-blue-800 font-semibold border border-blue-100 hover:border-blue-200 bg-blue-50/40 rounded py-1 transition-all">
                  Reset filters
                </button>
              </div>

              {/* Table with scroll */}
              <div className="border border-zinc-150 rounded-lg overflow-y-auto flex-1">
                <table className="w-full text-left text-[10px] relative">
                  <thead className="sticky top-0 bg-zinc-50 z-10">
                    <tr className="border-b border-zinc-150 text-[8px] font-mono text-zinc-400 uppercase tracking-wider">
                      <th className="p-2 font-bold">Item name</th>
                      <th className="p-2">Category</th>
                      <th className="p-2 text-center">On hand</th>
                      <th className="p-2 text-center">Minimum stock</th>
                      <th className="p-2 text-right">Stock status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryItems.map((item) => {
                      const isSelected = item.name === selectedItem;
                      return (
                        <tr 
                          key={item.name} 
                          onClick={() => setSelectedItem(item.name)}
                          className={`border-b border-zinc-100 last:border-none cursor-pointer transition-colors ${
                            isSelected ? 'bg-blue-50/50 border-l-2 border-l-blue-500 pl-1' : 'hover:bg-zinc-50/50'
                          }`}
                        >
                          <td className="p-2 font-semibold text-zinc-800 truncate max-w-[120px]">{item.name}</td>
                          <td className="p-2 text-zinc-500">{item.cat}</td>
                          <td className="p-2 text-center font-mono font-semibold text-zinc-750">{item.onHand}</td>
                          <td className="p-2 text-center font-mono text-zinc-500">{item.minStock}</td>
                          <td className="p-2 text-right">
                            <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-bold ${
                              item.status === 'In stock' 
                                ? 'bg-green-50 text-green-700 border border-green-100' 
                                : item.status === 'Out of stock'
                                ? 'bg-red-50 text-red-700 border border-red-100 animate-pulse'
                                : 'bg-orange-50 text-orange-700 border border-orange-100'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-zinc-100 pt-2 shrink-0 text-[9px] text-zinc-400 font-mono">
              <span>Rows per page: 25</span>
              <span>1-8 of 8</span>
            </div>
          </div>

          {/* Sidebar Detail (4 cols) */}
          <div className="w-1/3 bg-white border border-zinc-200 rounded-xl p-4 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="space-y-4 overflow-y-auto pr-1">
              <div className="space-y-0.5 border-b border-zinc-100 pb-2">
                <h3 className="font-bold text-zinc-900 text-xs">Item Detail</h3>
                <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Selected item: {activeItem.name}</p>
              </div>

              <div className="space-y-3">
                <div className="space-y-0.5">
                  <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider block">Shortage Summary</span>
                  <span className="font-medium text-zinc-800 text-[10.5px] leading-tight block bg-amber-50/30 border border-amber-100/50 p-2 rounded-lg">
                    {activeItem.shortage}
                  </span>
                </div>

                <div className="space-y-2.5 pt-1">
                  <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider block">Action</span>
                  <p className="text-[9.5px] text-zinc-550 leading-tight">Create a purchase request for the current shortage.</p>
                  <button 
                    onClick={() => onTabChange && onTabChange('purchasing')}
                    className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-[9px] font-bold transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Create request</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="border-t border-zinc-100 pt-3 space-y-1.5">
                  <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider block">Related orders</span>
                  <div className="text-[9.5px] text-zinc-600 leading-tight space-y-1 font-mono">
                    {activeItem.related.split(', ').map((str, i) => (
                      <span key={i} className="block">• {str}</span>
                    ))}
                  </div>
                  <button 
                    onClick={() => onTabChange && onTabChange('orders')}
                    className="text-[9px] text-blue-600 hover:text-blue-800 font-bold flex items-center gap-0.5 transition-colors cursor-pointer pt-1"
                  >
                    <span>View related orders</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-100 text-[8px] font-mono text-zinc-400">
              Active ledger subtracts non-floor stock automatically.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// SCREEN 4: Mock Purchasing Layout (with toggle to see Requests list!)
export const MockPurchasing: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const [selectedRec, setSelectedRec] = useState('Seal Kit SK-08');

  const recommendations = [
    { name: 'Seal Kit SK-08', shortage: 8, priority: 'High', order: 'PO-1048', required: 12, available: 4 },
    { name: 'Bearing BR-02', shortage: 10, priority: 'High', order: 'PO-1068', required: 10, available: 0 },
    { name: 'Impeller 4in', shortage: 18, priority: 'Medium', order: 'PO-1057', required: 27, available: 9 },
    { name: 'Motor Housing', shortage: 6, priority: 'Medium', order: 'PO-1051', required: 20, available: 14 },
    { name: 'Gasket G-14', shortage: 5, priority: 'Low', order: 'PO-1072', required: 12, available: 7 },
    { name: 'O-Ring Set', shortage: 18, priority: 'Medium', order: 'PO-1074', required: 18, available: 0 }
  ];

  const activeRec = recommendations.find(r => r.name === selectedRec) || recommendations[0];

  return (
    <div className="flex bg-[#F8F9FA] w-full h-[440px] text-[11px] overflow-hidden rounded-b-3xl" id="mock-purchasing-wrapper">
      <MockSidebar activeTab="purchasing" onTabChange={onTabChange} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <MockHeader title="Purchase Recommendations" />
        
        <div className="flex-1 p-4 flex gap-4 overflow-hidden">
          {/* Recommendations Table (8 cols) */}
          <div className="w-2/3 bg-white border border-zinc-200 rounded-xl p-4 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="space-y-3 overflow-hidden flex-1 flex flex-col">
              <div className="flex justify-between items-center shrink-0">
                <div>
                  <h3 className="font-bold text-zinc-950 text-xs tracking-tight">Recommended Purchases</h3>
                  <p className="text-[10px] text-zinc-400 font-light">Items that need purchasing to keep production moving</p>
                </div>
                <span className="text-[9px] font-mono text-zinc-400">6 RECOMMENDATIONS</span>
              </div>

              {/* Table */}
              <div className="border border-zinc-150 rounded-lg overflow-y-auto flex-1">
                <table className="w-full text-left text-[10px]">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-150 text-[8px] font-mono text-zinc-400 uppercase tracking-wider sticky top-0">
                      <th className="p-2 font-bold">Item name</th>
                      <th className="p-2 text-center">Shortage</th>
                      <th className="p-2 text-center">Priority</th>
                      <th className="p-2 text-right">Affected order</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recommendations.map((rec) => {
                      const isSelected = rec.name === selectedRec;
                      return (
                        <tr 
                          key={rec.name} 
                          onClick={() => setSelectedRec(rec.name)}
                          className={`border-b border-zinc-100 last:border-none cursor-pointer transition-colors ${
                            isSelected ? 'bg-blue-50/50 border-l-2 border-l-blue-500 pl-1' : 'hover:bg-zinc-50/50'
                          }`}
                        >
                          <td className="p-2 font-semibold text-zinc-800 truncate max-w-[120px]">{rec.name}</td>
                          <td className="p-2 text-center font-mono font-bold text-zinc-700">{rec.shortage}</td>
                          <td className="p-2 text-center">
                            <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-bold ${
                              rec.priority === 'High' 
                                ? 'bg-red-50 text-red-700 border border-red-100 animate-pulse' 
                                : rec.priority === 'Medium'
                                ? 'bg-orange-50 text-orange-700 border border-orange-100'
                                : 'bg-yellow-50 text-yellow-700 border border-yellow-100'
                            }`}>
                              {rec.priority}
                            </span>
                          </td>
                          <td className="p-2 text-right font-mono text-zinc-500">{rec.order}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-zinc-100 pt-2 shrink-0 text-[9px] text-zinc-400 font-mono">
              <span>Rows per page: 25</span>
              <span>1-6 of 6</span>
            </div>
          </div>

          {/* Right Sidebar specs (4 cols) */}
          <div className="w-1/3 bg-white border border-zinc-200 rounded-xl p-4 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="space-y-4 overflow-y-auto pr-1">
              <div className="space-y-0.5 border-b border-zinc-100 pb-2">
                <h3 className="font-bold text-zinc-900 text-xs">Recommendation Detail</h3>
                <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Selected item: {activeRec.name}</p>
              </div>

              <div className="space-y-3">
                <div className="space-y-0.5">
                  <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider block">Item Name</span>
                  <span className="font-bold text-zinc-800 text-[11px] block">{activeRec.name}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider block">Affected Order</span>
                    <span className="font-semibold text-zinc-750 text-[10px] block font-mono">{activeRec.order}</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider block">Priority</span>
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-bold ${
                      activeRec.priority === 'High' 
                        ? 'bg-red-50 text-red-700 border border-red-100' 
                        : 'bg-orange-50 text-orange-700 border border-orange-100'
                    }`}>
                      {activeRec.priority}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t border-b border-zinc-100 py-2">
                  <div className="space-y-0.5 text-center">
                    <span className="text-[7.5px] font-mono text-zinc-400 uppercase block">Required</span>
                    <span className="text-zinc-700 font-bold text-[10.5px] font-mono">{activeRec.required}</span>
                  </div>
                  <div className="space-y-0.5 text-center border-l border-r border-zinc-100">
                    <span className="text-[7.5px] font-mono text-zinc-400 uppercase block">Available</span>
                    <span className="text-zinc-700 font-bold text-[10.5px] font-mono">{activeRec.available}</span>
                  </div>
                  <div className="space-y-0.5 text-center">
                    <span className="text-[7.5px] font-mono text-zinc-400 uppercase block text-red-500 font-semibold">Shortage</span>
                    <span className="text-red-600 font-extrabold text-[10.5px] font-mono">{activeRec.shortage}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[8px] font-mono text-zinc-400 uppercase block">Suggested Action</span>
                  <p className="text-[9.5px] text-zinc-550 leading-tight">Create purchase request for {activeRec.shortage} missing units.</p>
                  <button 
                    onClick={() => onTabChange && onTabChange('requests')}
                    className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-[9px] font-bold transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Create request</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-100 text-[8px] font-mono text-zinc-400">
              One-click aggregates component deficits instantly.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// SCREEN 5: Mock Requests Layout (Active Purchase Requests)
export const MockRequests: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const [selectedReq, setSelectedReq] = useState('PR-2048');

  const activeReqsList = [
    { id: 'PR-2048', item: 'Seal Kit SK-08', order: 'PO-1048', qty: 8, priority: 'High', requested: 'Jun 10, 2026', received: 0, remaining: 8, status: 'Pending', notes: 'Parts ordered from Preferred supplier. Expecting delivery.' },
    { id: 'PR-2051', item: 'Bearing BR-02', order: 'PO-1068', qty: 10, priority: 'High', requested: 'Jun 9, 2026', received: 0, remaining: 10, status: 'Pending', notes: 'Vendor confirmed dispatch via premium courier.' }
  ];

  const partialReqsList = [
    { id: 'PR-2057', item: 'Impeller 4in', order: 'PO-1057', orderedQty: 18, receivedQty: 10, remainingQty: 8, status: 'Partial' },
    { id: 'PR-2063', item: 'Gasket G-14', order: 'PO-1063', orderedQty: 12, receivedQty: 5, remainingQty: 7, status: 'Partial' }
  ];

  const activeReq = activeReqsList.find(r => r.id === selectedReq) || activeReqsList[0];

  return (
    <div className="flex bg-[#F8F9FA] w-full h-[440px] text-[11px] overflow-hidden rounded-b-3xl" id="mock-requests-wrapper">
      <MockSidebar activeTab="requests" onTabChange={onTabChange} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <MockHeader title="Purchase Requests" />
        
        <div className="flex-1 p-4 flex gap-4 overflow-hidden">
          {/* Requests tables on left (8 cols) */}
          <div className="w-2/3 flex flex-col gap-4 overflow-y-auto pr-1">
            
            {/* Section 1: Active Purchase Requests */}
            <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-3 shadow-[0_1px_3px_rgba(0,0,0,0.02)] shrink-0">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-zinc-950 text-xs tracking-tight">Active Purchase Requests</h3>
                  <p className="text-[10px] text-zinc-400 font-light">Pending requests waiting for parts to arrive</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono text-zinc-400">2 ACTIVE</span>
                  <button className="px-2 py-0.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-[8px] font-bold transition-all">
                    Create request
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="border border-zinc-150 rounded-lg overflow-hidden">
                <table className="w-full text-left text-[10px]">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-150 text-[8px] font-mono text-zinc-400 uppercase tracking-wider">
                      <th className="p-2 font-bold">Request ID</th>
                      <th className="p-2">Item</th>
                      <th className="p-2">Related order</th>
                      <th className="p-2 text-center">Qty</th>
                      <th className="p-2 text-center">Priority</th>
                      <th className="p-2 text-right">Requested on</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeReqsList.map((req) => {
                      const isSelected = req.id === selectedReq;
                      return (
                        <tr 
                          key={req.id} 
                          onClick={() => setSelectedReq(req.id)}
                          className={`border-b border-zinc-100 last:border-none cursor-pointer transition-colors ${
                            isSelected ? 'bg-blue-50/50 border-l-2 border-l-blue-500 pl-1' : 'hover:bg-zinc-50/50'
                          }`}
                        >
                          <td className="p-2 font-mono font-bold text-zinc-800">{req.id}</td>
                          <td className="p-2 font-medium text-zinc-700">{req.item}</td>
                          <td className="p-2 font-mono text-zinc-500">{req.order}</td>
                          <td className="p-2 text-center font-mono text-zinc-650">{req.qty}</td>
                          <td className="p-2 text-center">
                            <span className="inline-block px-1.5 py-0.5 bg-red-50 text-red-700 border border-red-100 rounded text-[8px] font-bold">
                              {req.priority}
                            </span>
                          </td>
                          <td className="p-2 text-right font-mono text-zinc-400">{req.requested}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 2: Partially Received */}
            <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-3 shadow-[0_1px_3px_rgba(0,0,0,0.02)] shrink-0">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-zinc-950 text-xs tracking-tight">Partially Received</h3>
                  <p className="text-[10px] text-zinc-400 font-light">Requests with some parts received and a remaining quantity still open</p>
                </div>
                <span className="text-[9px] font-mono text-zinc-400">2 PARTIAL</span>
              </div>

              {/* Table */}
              <div className="border border-zinc-150 rounded-lg overflow-hidden">
                <table className="w-full text-left text-[10px]">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-150 text-[8px] font-mono text-zinc-400 uppercase tracking-wider">
                      <th className="p-2 font-bold">Request ID</th>
                      <th className="p-2">Item</th>
                      <th className="p-2 text-center">Ordered</th>
                      <th className="p-2 text-center">Received</th>
                      <th className="p-2 text-center">Remaining</th>
                      <th className="p-2 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partialReqsList.map((req) => (
                      <tr key={req.id} className="border-b border-zinc-100 last:border-none hover:bg-zinc-50/30">
                        <td className="p-2 font-mono font-bold text-zinc-500">{req.id}</td>
                        <td className="p-2 font-medium text-zinc-700">{req.item}</td>
                        <td className="p-2 text-center font-mono text-zinc-600">{req.orderedQty}</td>
                        <td className="p-2 text-center font-mono text-zinc-600">{req.receivedQty}</td>
                        <td className="p-2 text-center font-mono text-red-500 font-semibold">{req.remainingQty}</td>
                        <td className="p-2 text-right">
                          <span className="inline-block px-1.5 py-0.5 bg-yellow-50 text-yellow-700 border border-yellow-100 rounded text-[8px] font-bold">
                            {req.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 3: Recently Completed */}
            <div className="bg-white border border-zinc-200 rounded-xl p-4 flex justify-between items-center shadow-[0_1px_3px_rgba(0,0,0,0.02)] shrink-0">
              <div>
                <h3 className="font-bold text-zinc-950 text-xs tracking-tight">Recently Completed</h3>
                <p className="text-[10px] text-zinc-400 font-light">Received or cancelled requests kept for reference</p>
              </div>
              <span className="text-[9px] font-mono text-zinc-400">2 RECORDS</span>
            </div>

          </div>

          {/* Right Sidebar specs (4 cols) */}
          <div className="w-1/3 bg-white border border-zinc-200 rounded-xl p-4 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="space-y-4 overflow-y-auto pr-1">
              <div className="space-y-0.5 border-b border-zinc-100 pb-2">
                <h3 className="font-bold text-zinc-900 text-xs">Request Details</h3>
                <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">{activeReq.id} • {activeReq.item}</p>
              </div>

              <div className="space-y-3.5">
                <div className="grid grid-cols-3 gap-2 border-b border-zinc-100 pb-3">
                  <div className="space-y-0.5 text-center">
                    <span className="text-[7.5px] font-mono text-zinc-400 uppercase block">Ordered</span>
                    <span className="text-zinc-700 font-bold text-[10.5px] font-mono">{activeReq.qty}</span>
                  </div>
                  <div className="space-y-0.5 text-center border-l border-r border-zinc-100">
                    <span className="text-[7.5px] font-mono text-zinc-400 uppercase block">Received</span>
                    <span className="text-zinc-700 font-bold text-[10.5px] font-mono">{activeReq.received}</span>
                  </div>
                  <div className="space-y-0.5 text-center">
                    <span className="text-[7.5px] font-mono text-zinc-400 uppercase block">Remaining</span>
                    <span className="text-zinc-700 font-bold text-[10.5px] font-mono">{activeReq.remaining}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider block">Status</span>
                    <span className="inline-block px-1.5 py-0.5 bg-zinc-100 text-zinc-600 rounded text-[8px] font-bold">
                      {activeReq.status}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider block">Supplier</span>
                    <span className="font-semibold text-zinc-750 text-[10px] block truncate">Preferred supplier</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1.5 border-t border-zinc-100">
                  <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider block">Next Step</span>
                  <p className="text-[9.5px] text-zinc-550 leading-relaxed font-light">{activeReq.notes}</p>
                  <p className="text-[9.5px] text-zinc-550 leading-relaxed font-light">Mark parts as received when they arrive, or edit/cancel this request if details are wrong.</p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-100">
                  <button className="py-1.5 border border-zinc-200 hover:border-zinc-300 text-zinc-600 rounded text-[9px] font-bold transition-all flex items-center justify-center">
                    Edit request
                  </button>
                  <button className="py-1.5 border border-red-100 hover:border-red-200 text-red-600 rounded text-[9px] font-bold transition-all flex items-center justify-center">
                    Cancel request
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-100 shrink-0">
              <button className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-[9px] font-bold transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer">
                <span>Mark as received</span>
                <Check className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main interactive frame wrapper that embeds the custom mockups with dynamic tab switcher
interface BrowserFrameProps {
  initialTab: 'dashboard' | 'orders' | 'inventory' | 'purchasing' | 'requests';
  url: string;
}

const TAB_SCREENSHOTS: Record<string, string> = {
  dashboard: 'https://i.imgur.com/kJ97VNS.png',
  orders: 'https://i.imgur.com/MSI21zc.png',
  inventory: 'https://i.imgur.com/qCSorxc.png',
  purchasing: 'https://i.imgur.com/yKtOh5N.png',
  requests: '/screenshots/screenshot_2026-02-18_at_10.07.48_pm_msg315_idx6.png'
};

export const InteractiveBrowserMockup: React.FC<BrowserFrameProps> = ({ initialTab }) => {
  const [activeTab] = useState(initialTab);

  return (
    <div className="border border-zinc-200 rounded-3xl overflow-hidden bg-zinc-950 shadow-md transition-all hover:border-zinc-300" id={`browser-frame-${initialTab}`}>
      {/* Screen Render - Direct Screenshot Presentation */}
      <div className="relative flex flex-col items-center justify-center group select-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        
        <img 
          src={TAB_SCREENSHOTS[activeTab]} 
          alt={`${activeTab} actual screenshot`}
          referrerPolicy="no-referrer"
          className="w-full h-auto object-contain transition-transform duration-500 hover:scale-[1.01]"
          onError={(e) => {
            // Fallback if image doesn't load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      </div>
    </div>
  );
};
