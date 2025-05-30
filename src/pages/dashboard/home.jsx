import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import { statisticsCardsData } from "@/data";

// Recharts components
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Chart Data
const employeeChartData = [
  { time: "08:00 AM", sale: 400, visitors: 100, employees: 80 },
  { time: "10:00 AM", sale: 390, visitors: 100, employees: 60 },
  { time: "12:00 PM", sale: 0, visitors: 0, employees: 40 },
  { time: "02:00 PM", sale: 0, visitors: 0, employees: 0 },
  { time: "04:00 PM", sale: 0, visitors: 0, employees: 0 },
  { time: "06:00 PM", sale: 0, visitors: 0, employees: 0 },
  { time: "08:00 PM", sale: 0, visitors: 0, employees: 0 },
];

const pieChartData = [
  { name: "Wages", value: 8000 },
  { name: "Hours", value: 8 },
  { name: "Sales", value: 103430 },
];

const COLORS = ["#f26421", "#000", "#2b7de9"];

// Combined Chart Component (Bar + Line + Pie)
function EmployeeSaleCustomerChart() {
  return (
    <Card className="border border-blue-gray-100 shadow-sm">
      <CardHeader floated={false} shadow={false} className="p-4">
        <Typography variant="h6" color="blue-gray">
          Employee/Sale/Customer (ratio)
        </Typography>
      </CardHeader>
      <CardBody className="pt-0">
        {/* Bar and Line Chart */}
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={employeeChartData}>
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="time" />
              <YAxis
                yAxisId="left"
                label={{
                  value: "Sale Amount",
                  angle: -90,
                  position: "insideLeft",
                  fill: "red",
                }}
                stroke="red"
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                label={{
                  value: "Customer & Employee Number",
                  angle: 90,
                  position: "insideRight",
                  offset: 10,
                  style: { fill: "blue", fontSize: 12, fontWeight: "bold" },
                }}
                stroke="blue"
              />
              <ReTooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="sale" fill="#391eda" name="Sale" />
              <Bar
                yAxisId="right"
                dataKey="visitors"
                fill="#1ad5ee"
                name="Visitors"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="employees"
                stroke="#16a34a"
                strokeWidth={2}
                name="Employee"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        {/* <div className="mt-10 h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <ReTooltip />
            </PieChart>
          </ResponsiveContainer>
        </div> */}
      </CardBody>
    </Card>
  );
}

// Home Page
export function Home() {
  return (
    <div className="mt-12">
      {/* Statistic Cards */}
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              footer?.label && (
                <Typography className="font-normal text-blue-gray-600">
                  <strong className={footer.color}>{footer.value}</strong>
                  &nbsp;{footer.label}
                </Typography>
              )
            }
          />
        ))}
      </div>

      {/* Chart Section */}
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-3">
          <EmployeeSaleCustomerChart />
        </div>
      </div>
    </div>
  );
}

export default Home;
