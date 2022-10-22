
import SpotCard from "../../components/SpotCard";


import { GETSpotFetcherAll } from "../../utils/GETfetchers";

export const getServerSideProps = async (context) => {

    try {
        // Executing the fx that will fetch all Spots
        const resultFetchGET = await GETSpotFetcherAll()


        return {
            props: {
                spots: resultFetchGET,
            },
        };



    } catch (error) {
        console.log(error);
        return {
            notFound: true,
        }
    }
}









const allSpots = ({ spots }) => {

    return (
        <>
            <div
                className="grid grid-flow-col auto-cols-max space-x-6 justify-center">
                {
                    spots.map((spot) =>
                        <SpotCard
                            key={spot._id}
                            id={spot._id}
                            title={spot.title}
                            description={spot.description}
                            categories={spot.categories}
                        />
                    )
                }
            </div>
        </>
    )
}

export default allSpots 