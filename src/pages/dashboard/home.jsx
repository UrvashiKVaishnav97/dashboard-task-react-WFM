import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import {
  statisticsCardsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";

// NEW chart imports
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
} from "recharts";

const employeeChartData = [
  { time: "08:00 AM", sale: 400, visitors: 100, employees: 80 },
  { time: "10:00 AM", sale: 390, visitors: 100, employees: 60 },
  { time: "12:00 PM", sale: 0, visitors: 0, employees: 40 },
  { time: "02:00 PM", sale: 0, visitors: 0, employees: 0 },
  { time: "04:00 PM", sale: 0, visitors: 0, employees: 0 },
  { time: "06:00 PM", sale: 0, visitors: 0, employees: 0 },
  { time: "08:00 PM", sale: 0, visitors: 0, employees: 0 },
];

function EmployeeSaleCustomerChart() {
  return (
    <Card className="border border-blue-gray-100 shadow-sm">
      <CardHeader floated={false} shadow={false} className="p-4">
        <Typography variant="h6" color="blue-gray">
          Employee/Sale/Customer (ratio)
        </Typography>
      </CardHeader>
      <CardBody className="pt-0">
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={employeeChartData}>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="time" />
            <YAxis
              yAxisId="left"
              label={{ value: "Sale Amount", angle: -90, position: "insideLeft", fill: "red" }}
              stroke="red"
            />
           <YAxis
  yAxisId="right"
  orientation="right"
  label={{
    value: "Customer & Employee Number",
    angle: 90,
    position: "insideRight", // or "outsideRight"
    offset: 10,               // spacing from the axis line
    style: { fill: "blue", fontSize: 12 , fontWeight: 'bold'},
  }}
  stroke="blue"
/>

            <ReTooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="sale" fill="#391eda" name="Sale" />
            <Bar yAxisId="right" dataKey="visitors" fill="#1ad5ee" name="Visitors" />
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
      </CardBody>
    </Card>
  );
}

export function Home() {
  return (
    <div className="mt-12">
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
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>

      {/* CHART SECTION */}
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-3">
        <EmployeeSaleCustomerChart />
      </div>
      </div>
    </div>
  );
}

export default Home;
