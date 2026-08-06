export default function ActivityFeed(){

const activities=[

"New quotation created - Siemens Energy",

"Delivery completed - Erbil Warehouse",

"New customer added",

"Inventory updated"

];


return(

<div
className="
bg-white
rounded-3xl
p-6
shadow-sm
border
"
>

<h3
className="
text-xl
font-bold
text-[#071A33]
mb-5
"
>
Recent Activity
</h3>


<div className="space-y-4">

{
activities.map((item,index)=>(

<div
key={index}
className="
border-b
pb-3
text-gray-600
"
>

{item}

</div>

))
}

</div>


</div>

)

}