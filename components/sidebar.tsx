"use client";

export default function Sidebar(){

return(

<aside
className="
w-64
min-h-screen
bg-[#071A33]
text-white
p-6
"
>

<h1
className="
text-3xl
font-bold
mb-10
"
>
VE
<span className="text-blue-400">
One
</span>
</h1>


<nav className="space-y-4">


<Menu text="Dashboard"/>

<Menu text="Customers"/>

<Menu text="Sales"/>

<Menu text="Quotations"/>

<Menu text="Inventory"/>

<Menu text="Deliveries"/>

<Menu text="Reports"/>


</nav>


</aside>

)

}



function Menu({
text
}:{
text:string
}){

return(

<div
className="
px-4
py-3
rounded-xl
hover:bg-white/10
cursor-pointer
transition
"
>

{text}

</div>

)

}