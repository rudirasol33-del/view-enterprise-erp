"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const data = [
  {
    month: "Jan",
    sales: 4000,
  },
  {
    month: "Feb",
    sales: 7000,
  },
  {
    month: "Mar",
    sales: 5500,
  },
  {
    month: "Apr",
    sales: 9000,
  },
  {
    month: "May",
    sales: 12000,
  },
  {
    month: "Jun",
    sales: 15000,
  },
];


export default function SalesChart(){

return(

<div
className="
bg-white
rounded-3xl
p-6
shadow-sm
border
h-80
"
>

<h3
className="
text-xl
font-bold
text-[#071A33]
mb-6
"
>
Sales Analytics
</h3>


<ResponsiveContainer width="100%" height="80%">

<LineChart data={data}>

<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>


<Line

type="monotone"

dataKey="sales"

stroke="#0066CC"

strokeWidth={3}

/>


</LineChart>

</ResponsiveContainer>


</div>

)

}