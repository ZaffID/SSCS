import { Component, For, createSignal, onMount } from 'solid-js';
import { FaSolidDownload, FaSolidCalendar, FaSolidChevronDown, FaSolidChartBar, FaSolidChartPie, FaSolidGear } from 'solid-icons/fa';
import { Chart, registerables } from 'chart.js';

// Register all Chart.js components
Chart.register(...registerables);

// Mock data for the analytics
const summaryData = [
  { label: 'Total Stations', value: '1,234', change: '+12%', trend: 'up' },
  { label: 'Active Now', value: '842', change: '+5%', trend: 'up' },
  { label: 'Issues', value: '42', change: '-8%', trend: 'down' },
  { label: 'Uptime', value: '99.7%', change: '+0.2%', trend: 'up' },
];

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  values: [65, 59, 80, 81, 56, 55, 40, 45, 50, 65],
};

const tableData = [
  { id: 1, name: 'SPBU 12345', location: 'Jakarta Selatan', status: 'Online', uptime: '99.9%', lastCheck: '2 min ago' },
  { id: 2, name: 'SPBU 12346', location: 'Jakarta Barat', status: 'Warning', uptime: '98.2%', lastCheck: '5 min ago' },
  { id: 3, name: 'SPBU 12347', location: 'Jakarta Utara', status: 'Offline', uptime: '0%', lastCheck: '1 hour ago' },
  { id: 4, name: 'SPBU 12348', location: 'Jakarta Timur', status: 'Online', uptime: '99.5%', lastCheck: '3 min ago' },
  { id: 5, name: 'SPBU 12349', location: 'Jakarta Pusat', status: 'Online', uptime: '99.8%', lastCheck: '1 min ago' },
];

const Analytics: Component = () => {
  const [activeTab, setActiveTab] = createSignal('overview');
  const [dateRange, setDateRange] = createSignal('This Month');
  const [searchQuery, setSearchQuery] = createSignal('');
  
  // Chart reference
  let chartRef: HTMLCanvasElement;
  let chartInstance: Chart | null = null;
  
  // Initialize chart when component mounts
  onMount(() => {
    if (chartRef) {
      const ctx = chartRef.getContext('2d');
      if (ctx) {
        // Destroy previous chart instance if exists
        if (chartInstance) {
          chartInstance.destroy();
        }
        
        // Create new chart instance
        chartInstance = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            datasets: [
              {
                label: 'Blue',
                data: [32, 45, 28, 50, 42, 36, 48, 40, 44, 52],
                backgroundColor: '#3B82F6', // blue-500
                borderRadius: 6,
                borderSkipped: false,
                barThickness: 18,
              },
              {
                label: 'Green',
                data: [24, 30, 35, 26, 38, 28, 30, 36, 32, 34],
                backgroundColor: '#10B981', // green-500
                borderRadius: 6,
                borderSkipped: false,
                barThickness: 18,
              },
              {
                label: 'Purple',
                data: [20, 18, 26, 22, 24, 30, 26, 28, 36, 30],
                backgroundColor: '#8B5CF6', // purple-500
                borderRadius: 6,
                borderSkipped: false,
                barThickness: 18,
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top' as const,
                labels: {
                  usePointStyle: true,
                  padding: 20,
                }
              },
              tooltip: {
                backgroundColor: 'white',
                titleColor: '#1f2937',
                bodyColor: '#4b5563',
                borderColor: '#e5e7eb',
                borderWidth: 1,
                padding: 12,
                usePointStyle: true,
                callbacks: {
                  label: (context) => {
                    const label = context.dataset.label || '';
                    const value = context.parsed.y;
                    return `${label}: ${value} Stations`;
                  }
                }
              }
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
                border: {
                  display: false,
                },
                ticks: {
                  color: '#6b7280'
                },
                stacked: false
              },
              y: {
                grid: {
                  color: '#e5e7eb',
                  drawTicks: false,
                  lineWidth: 1,
                },
                border: {
                  display: false
                },
                ticks: {
                  color: '#6b7280',
                  callback: (value) => value
                },
                min: 0,
                max: 120,
                beginAtZero: true,
                stacked: false
              }
            },
            interaction: {
              mode: 'index',
              intersect: false,
            },
            layout: {
              padding: {
                top: 10,
                right: 20,
                bottom: 10,
                left: 10
              }
            }
          }
        });
      }
    }
    
    // Cleanup on unmount
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  });

  return (
    <div class="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p class="text-gray-500">Monitor your SPBU network performance and statistics</p>
        </div>
        <div class="flex items-center gap-3">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSolidCalendar class="h-4 w-4 text-gray-400" />
            </div>
            <select 
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={dateRange()}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option>Today</option>
              <option>This Week</option>
              <option selected>This Month</option>
              <option>This Year</option>
              <option>Custom Range</option>
            </select>
          </div>
          <button class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <FaSolidDownload class="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <For each={summaryData}>
          {(item) => (
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div class="flex justify-between items-start">
                <div>
                  <p class="text-sm font-medium text-gray-500">{item.label}</p>
                  <p class="mt-1 text-2xl font-semibold text-gray-900">{item.value}</p>
                </div>
                <span class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  item.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {item.change}
                </span>
              </div>
              <div class="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  class={`h-full rounded-full ${
                    item.trend === 'up' ? 'bg-green-500' : 'bg-red-500'
                  }`} 
                  style={{ width: '85%' }}
                />
              </div>
            </div>
          )}
        </For>
      </div>

      {/* Main Chart */}
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 class="text-lg font-semibold text-gray-900">Performance Overview</h2>
            <p class="text-sm text-gray-500">Showing data for {dateRange().toLowerCase()}</p>
          </div>
          <div class="flex items-center gap-2">
            <button class="px-3 py-1.5 text-sm font-medium rounded-lg bg-blue-50 text-blue-700">Day</button>
            <button class="px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-lg">Week</button>
            <button class="px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-lg">Month</button>
            <button class="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg">
              <FaSolidChartBar class="h-5 w-5" />
            </button>
            <button class="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg">
              <FaSolidChartPie class="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Chart Container */}
        <div class="h-80 w-full">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>

      {/* Data Table */}
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="p-4 border-b border-gray-200">
          <div class="sm:flex sm:items-center sm:justify-between">
            <div>
              <h2 class="text-lg font-semibold text-gray-900">SPBU Status</h2>
              <p class="mt-1 text-sm text-gray-500">Real-time status of all SPBU stations</p>
            </div>
            <div class="mt-3 sm:mt-0">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSolidGear class="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search stations..."
                  value={searchQuery()}
                  onInput={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SPBU Name
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uptime
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Check
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <For each={tableData}>
                {(row) => (
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {row.name}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.location}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        row.status === 'Online' ? 'bg-green-100 text-green-800' : 
                        row.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.uptime}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.lastCheck}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button class="text-blue-600 hover:text-blue-900">View</button>
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
        
        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing <span class="font-medium">1</span> to <span class="font-medium">5</span> of <span class="font-medium">24</span> results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span class="sr-only">Previous</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </a>
                <a href="#" aria-current="page" class="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  1
                </a>
                <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  2
                </a>
                <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  3
                </a>
                <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
                <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  8
                </a>
                <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span class="sr-only">Next</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
