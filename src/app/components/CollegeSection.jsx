import dbConnect, { collegeObject } from '@/lib/dbConnect';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

export default async function CollegeSection() {

	const serviceCollection = dbConnect(collegeObject.collegeCollection);
	const data = await serviceCollection.find({}).toArray();

	console.log('database data--->',data);

  return (
	<div className='grid lg:grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1 my-8'>
		{data.map((item) =>{
			return (
				<div 
				className='border-2 border-orange-400 p-2 rounded-lg flex-wrap' 
				key={item.service_id}>
					<figure>
					<Image className='object-cover rounded-lg mb-2'  alt={item.title} src={item.img} width={400} height={400}/>
					</figure>
					<div className=''>
						<div>
							<h2 className='font-semibold'>{item.title}</h2>
						
						</div>
						<div className='flex gap-4 items-center'>
						<p>Price: ${item.price}</p>
							<Link href={`/services/${item._id}`} className='text-orange-500'> <FaArrowUpRightFromSquare/> </Link>
						</div>
					</div>
				</div>
			)
		})}
	</div>
  )
}