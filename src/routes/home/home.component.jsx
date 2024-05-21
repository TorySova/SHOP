import { Outlet } from "react-router-dom";
import Directory from "../../components/directory/directory.component";

const Home = () => {

  const categories = [
    {
      id: 0,
      title: 'Header 0',
      imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png'
    },
    {
      id: 1,
      title: 'Header 1',
      imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png'
    },
    {
      id: 2,
      title: 'Header 2',
      imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png'
    },
    {
      id: 3,
      title: 'Header 3',
      imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png'
    },
    {
      id: 4,
      title: 'Header 4',
      imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png'
    }
  ]

  return (
	<div>
		<Outlet/>
		<Directory categories={categories}/>
	</div>
  )
}

export default Home;
