import { useState } from 'react';

import { authOptions } from '../api/auth/[...nextauth]';
import { unstable_getServerSession } from "next-auth/next"

import { useRouter } from 'next/router'
import { editSpotHandler, deleteSpotHandler, addOneVisitSpotHandler } from "../../utils/APIfetchers";

import didUserVisited from "../../utils/Spots/didUserVisitedSpot";


import { GETSpotFetcherOne } from "../../utils/GETfetchers";


import SpotAction from "../../components/SpotAction";


import Link from 'next/link';

import Toggler from '../../components/Toggler';


import MapShow from '../../components/Maps/MapShow';

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { Rating } from '@mui/material';

export const getServerSideProps = async (context) => {

    const session = await unstable_getServerSession(context.req, context.res, authOptions)



    try {
        // Getting the ID of the current spot
        const ID = context.params.spotID

        // Executing the fx that will fetch the precise Spot
        const resultFetchGETOne = await GETSpotFetcherOne(ID)



        return {
            props: {
                indivSpot: resultFetchGETOne,
                currentUserID: session ? session.userID : null
            },
        };


    } catch (error) {
        console.log(error);
        return {
            notFound: true,
        }
    }
}




const ShowSpot = ({ indivSpot, currentUserID }) => {

    // State that manages toggler + give info to API route whether to decrement or increment
    const didVisit = didUserVisited(indivSpot.visited.visitors, currentUserID)
    const [didUserVisitSpot, setDidUserVisitSpot] = useState(didVisit);


    // Did this to update in real time nb of visits when user toggle
    const nbVisit = indivSpot.visited.numberOfVisits
    const [nbOfVisit, setNbOfVisit] = useState(nbVisit);



    // For star rating
    const [value, setValue] = useState(2);


    // To tell to API route which spot are we talking about -- can replace by info coming from GSP ? 
    const router = useRouter();
    const { spotID } = router.query





    // Will call the fetcher for Edit located in utils - params come from children
    const handleEdit = async (editedEnteredData) => {
        await editSpotHandler(editedEnteredData, spotID)

        // For toaster notif
        localStorage.setItem("toast", "editSpot");

        router.push("/spots/allSpots") //Navigate back to root
    }



    // // This will be rendered in the toast
    const CustomToastWithLink = () => (
        <>
            <Link
                href="/auth/SignIn">
                <a className='text-[#3498db] underline'>Please login</a>
            </Link>
            <span> to mark this spot as verified</span>
        </>
    );



    // Will call the fetcher for ADDING visit
    const handleAddVisit = async () => {
        const addVisit = await addOneVisitSpotHandler(currentUserID, spotID, didUserVisitSpot)

        // if failure in add success and user not logged in...
        if (!addVisit.success && !currentUserID) {
            toast.error(CustomToastWithLink, {
                position: "bottom-left",
                toastId: "connectToMarkVisitedSuccess"
            });


            // if success...
        } else {

            if (!didUserVisitSpot) {
                toast.success("You marked this spot as visited!", {
                    position: "bottom-left",
                    toastId: "connectToMarkVisitedSuccess"
                });
            } else {
                toast.success("You removed this spot from visited!", {
                    position: "bottom-left",
                    toastId: "connectToMarkVisitedSuccess"
                });
            }

            setDidUserVisitSpot((prevState) => !prevState)
            setNbOfVisit((prevState) => didUserVisitSpot ? prevState - 1 : prevState + 1)
        }
    }



    // Will call the fetcher for DELETE located in utils
    const handleDelete = async () => {
        await deleteSpotHandler(spotID)

        // For toaster notif
        localStorage.setItem("toast", "deleteSpot");

        router.push("/spots/allSpots") //Navigate back to root
    }



    // If owner of camp, don't display toggle
    let shouldTogglerDisplay
    if (!currentUserID) { // if not logged in
        shouldTogglerDisplay = true
    } else if (currentUserID === indivSpot.author) { // if logged in and author
        shouldTogglerDisplay = false
    } else { // if logged in and NOT author
        shouldTogglerDisplay = true
    }

    return (
        <>
            {
                <ToastContainer
                    autoClose={4000}
                    style={{ width: "400px" }}
                />
            }



            <MapShow
                initialView={{
                    longitude: 55.18,
                    latitude: 25.07,
                    zoom: 2
                }}
                markerCoordinates={{ Longitude: indivSpot.geometry.coordinates[0], Latitude: indivSpot.geometry.coordinates[1] }}
            />






            <p>Title: {indivSpot.title}</p>
            <p>Description: {indivSpot.description}</p>
            <p>Country: {indivSpot.country}</p>
            <p> This Spot has been visited {nbOfVisit} times </p>



            {
                shouldTogglerDisplay &&
                <Toggler
                    onToggle={handleAddVisit}
                    didUserVisitSpot={didUserVisitSpot}
                />
            }







            <p>CATEGORIES: {indivSpot.categories.join(", ")} </p>
            <p>LATITUDE: {indivSpot.locationDrag.Latitude}</p>
            <p>LONGITUDE: {indivSpot.locationDrag.Longitude}</p>



            <div>
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                />
            </div>


            <div>
                <Rating name="read-only" value={value} readOnly />
            </div>




            {/* Spot Edition */}
            {
                // status === "authenticated" &&
                currentUserID === indivSpot.author &&
                <SpotAction
                    action={"edition"}
                    message1={"Click here to Edit the Spot"}
                    message2={"Cancel Spot Edition"}
                    onSpotAction={handleEdit}
                    previousValues={indivSpot}
                />
            }


            {/* Spot Deletion */}
            {
                // status === "authenticated" &&
                currentUserID === indivSpot.author &&
                <SpotAction
                    action={"deletion"}
                    message1={"Click here to Delete the Spot"}
                    message2={"Do you really want to delete the Spot?"}

                    onSpotAction={handleDelete}
                    previousValues={indivSpot}
                />
            }

            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa, reiciendis illo aut ad nam nostrum saepe. Eum tempore consequatur ut? Error libero minus assumenda placeat, quia voluptatibus? Recusandae, quibusdam accusamus.
            Quibusdam, exercitationem. Aliquid recusandae quisquam voluptas maxime quod adipisci natus obcaecati! Sapiente quia ea, nihil unde nemo in rem dolor! Neque, reprehenderit voluptatem? Labore iure laboriosam assumenda voluptate aut ullam!
            Cumque numquam repudiandae natus deleniti molestiae similique eligendi obcaecati debitis corrupti necessitatibus eius error quod quidem doloribus possimus quibusdam, labore, quasi voluptate sed, nemo eos fugit esse voluptatibus. Iste, distinctio.
            Totam eius, illum nam quia distinctio eum culpa et? Illo, cumque voluptates cupiditate neque dolore molestias in praesentium alias, est temporibus vel possimus odit iste molestiae voluptas placeat! A, quas!
            Officia voluptatibus saepe odio ea provident laborum beatae quo in fugit, labore harum inventore minus esse, illum blanditiis earum libero laboriosam dicta et sed asperiores! Quo eos alias temporibus quae!
            Repudiandae doloribus voluptas nobis, dignissimos necessitatibus alias mollitia repellat fugit enim fuga ducimus, soluta, distinctio velit? Provident quo porro deleniti, quos maxime non veniam qui repudiandae, delectus aperiam numquam amet.
            Recusandae error animi hic placeat corporis tempora illum impedit tempore, officiis quisquam quia veritatis itaque quidem quam perspiciatis nemo, libero exercitationem rem cupiditate sit harum nulla totam. Quisquam, sunt facere.
            Nulla odit commodi nostrum, minima aliquid repellat, dicta omnis ipsam ad modi dignissimos necessitatibus a tempora eligendi libero enim sed amet sint dolor, harum expedita assumenda eius voluptatibus? Architecto, delectus?
            Odit ratione ducimus illo similique. Laudantium cumque recusandae libero praesentium quos facere asperiores sint. Corrupti, dolore. Alias modi esse sit temporibus praesentium a dolor. Quibusdam a id natus adipisci. Eum?
            Ex eos totam quaerat sint veniam vero a commodi voluptatem vitae. Accusantium ducimus eligendi commodi asperiores debitis molestiae blanditiis tempora consequatur harum. Rerum odit illo quidem aperiam consequuntur cumque nobis!
            Impedit ex deserunt molestias consectetur. Maiores harum modi veniam repellendus unde itaque? Mollitia qui rerum illum veniam in commodi odit ipsum sed, reiciendis laudantium ad molestias officiis explicabo sint beatae?
            Corrupti deserunt nemo minima ipsa, quia veniam reiciendis iure assumenda ipsum quasi voluptate eum aspernatur! Aperiam nulla voluptate fugit, veniam numquam, impedit eveniet reiciendis amet sit cupiditate tenetur exercitationem enim.
            Quis exercitationem nobis, beatae assumenda tenetur saepe ad perferendis veniam esse facere, voluptate cupiditate consequatur, repudiandae blanditiis iure quas eos amet explicabo delectus incidunt tempore natus numquam laudantium? Obcaecati, ea!
            Ab totam cupiditate asperiores voluptates dicta! Magni fugiat sed asperiores recusandae quod laborum repellat molestiae? Minus culpa optio aperiam, impedit suscipit voluptate at libero, aliquid ullam harum tenetur esse reprehenderit?
            Repudiandae illum, labore quam animi vel dolorum accusantium nihil quos voluptatibus vitae neque in, nostrum voluptatum? Tenetur, fuga minus? Sequi rem temporibus molestias nemo impedit eveniet nulla architecto ratione ad!
            Illum labore aliquam iusto beatae voluptatibus at a quam et voluptates in fugit corporis cum velit repellendus facilis nihil vero error voluptas laudantium odio laborum, corrupti natus sunt? Quae, perspiciatis.
            Assumenda voluptatibus aperiam ratione, eos deleniti veritatis atque soluta necessitatibus quod, nostrum amet ut numquam! Similique neque nemo animi expedita placeat vitae ut cum ex, natus saepe. Doloribus, ab iste.
            Tenetur velit voluptas non ut facere officiis reiciendis maxime a architecto harum dignissimos, cumque laudantium consequuntur fugiat itaque eos placeat voluptatum ipsam obcaecati accusamus deserunt explicabo soluta? Deleniti, ipsum deserunt.
            Eveniet in, laboriosam dolores quisquam assumenda facilis deserunt totam exercitationem natus odio iusto aut, quaerat soluta veniam dolor libero. Non, quasi doloremque culpa velit alias iusto reprehenderit molestiae eius quam.
            Rerum veritatis vel tempora nulla minus. Temporibus aliquid odio sunt cupiditate a quisquam quaerat? Blanditiis, ipsam dolores numquam nisi quam aliquid facere eligendi aspernatur dolorem architecto eveniet iusto! Veritatis, ratione.
            Placeat est cumque explicabo harum suscipit! Ipsa sequi, at architecto, nulla provident, voluptates unde dolores labore saepe a perspiciatis dolorem enim eius. Facilis id praesentium placeat, voluptates soluta laudantium earum?
            Quo eos quis aliquid quod blanditiis, distinctio aperiam voluptate soluta repellat quam quisquam aliquam quibusdam recusandae labore eligendi sunt praesentium quaerat deleniti sapiente laborum. Esse vel velit modi blanditiis ex?
            Praesentium asperiores at voluptatum quaerat pariatur. Voluptatem, expedita deserunt eligendi dicta rem deleniti maiores doloribus harum ea tenetur veniam laborum perspiciatis officiis. Quo veritatis autem nulla dolores, officiis optio quidem?
            Saepe eveniet beatae voluptatem enim minus, eligendi voluptatum pariatur tempora, ipsam architecto exercitationem totam ullam error dicta aperiam eaque minima neque eius, cumque quis? Reprehenderit, maxime? Atque quas nesciunt repudiandae.
            Itaque placeat dignissimos quos impedit cupiditate sed exercitationem sint minus, voluptate similique animi aspernatur suscipit at provident, tenetur odio! Minima aliquam quod odio expedita dolorem qui quis praesentium veritatis ducimus!
            Qui vel explicabo et molestiae necessitatibus corrupti, inventore veritatis rem expedita officia similique non architecto. Illo excepturi voluptate voluptatem odit atque a non asperiores enim eum quisquam! Quam, esse impedit?
            Eos voluptates sequi facere esse aut incidunt deserunt, sapiente inventore nobis magnam neque nesciunt minus modi ad libero. Facilis quia illum laudantium tempora est, vitae ex labore aperiam amet obcaecati!
            Dolorum saepe, earum esse, dicta libero quis, voluptates consequuntur porro deleniti vitae ullam exercitationem sed modi eaque explicabo excepturi quibusdam! Incidunt veniam tempore mollitia commodi nostrum recusandae, et quas cupiditate.
            Labore consequatur quis earum commodi accusantium cumque autem explicabo quos dolore quas perspiciatis, est facilis dignissimos a id in impedit sit eligendi vel libero? Impedit culpa pariatur inventore illum quisquam!
            Earum vel numquam fuga illo nulla alias necessitatibus incidunt rem ex adipisci id repudiandae aperiam dolores at excepturi laboriosam, commodi suscipit soluta debitis officiis. Provident voluptates ullam consequuntur quod possimus?
            Quidem numquam non eligendi delectus nesciunt corporis nulla eaque expedita saepe rem vitae, blanditiis voluptatum libero, voluptatibus tenetur eos ad necessitatibus exercitationem alias fuga nisi tempore eveniet excepturi hic. Ipsum.
            Minus blanditiis doloremque perspiciatis dicta, ratione error odio eligendi adipisci iste deleniti cupiditate! Non, ex? Ut ipsam quis, ducimus omnis consequuntur velit ad dolores, iusto possimus quibusdam quaerat illo mollitia.
            In optio sit ipsa quo culpa porro facilis eum dicta eos, officiis corrupti saepe blanditiis repellat suscipit a eveniet doloribus unde tenetur? Minima, cumque. Dolor rem accusantium ratione. Corporis, maiores.
            Quidem est, quae consequuntur suscipit incidunt blanditiis nulla dolorem sed ut excepturi. Et libero nostrum esse magni, adipisci tempore nesciunt quas, tenetur necessitatibus ipsum nulla cupiditate, voluptatum ducimus aspernatur quod.
            Similique tempore voluptatibus saepe labore autem itaque praesentium in maxime! Reprehenderit odio natus officia, excepturi debitis, pariatur distinctio, fugiat quae odit ex maxime impedit ipsum dolore esse aspernatur quisquam obcaecati!
            Suscipit sit recusandae inventore saepe voluptas eligendi veritatis veniam ipsa perspiciatis aut autem voluptatum adipisci assumenda, necessitatibus iure distinctio reiciendis quidem hic nisi omnis iusto quos consectetur officiis modi! Rerum.
            Illo error neque provident sit rerum qui voluptas at doloremque dolores adipisci modi ipsum, expedita consequuntur tenetur rem non, amet eum nihil molestias cumque labore tempora. Totam magni suscipit architecto.
            Id suscipit impedit, dolore fugit pariatur porro quam consectetur consequatur delectus repellat. Culpa, quos quaerat suscipit tempora et animi maxime necessitatibus dolorem soluta rem autem modi? Sunt molestias rerum repellendus!
            Voluptate temporibus dolor sed facilis maiores enim, recusandae quasi mollitia esse voluptatum voluptas pariatur, deserunt totam quidem architecto cum cupiditate sint. Vel sapiente, quaerat vitae aut ipsam repellendus similique nobis.
            Saepe neque nesciunt laudantium delectus soluta consectetur maxime fuga numquam aut ratione blanditiis dolor nobis, sequi libero illo consequuntur nam optio sunt? Recusandae perferendis maxime iure nemo, quaerat obcaecati hic?
            Natus, saepe ab architecto deleniti id cupiditate ad laborum omnis et sit voluptatem dignissimos consequuntur culpa, hic voluptatum. Blanditiis deserunt qui ad. Labore deserunt sit, voluptates repudiandae dicta natus qui?
            Et quas eum cum expedita, voluptas odit rem blanditiis vero doloribus praesentium accusamus repudiandae nulla veritatis laudantium, dolores illo non? Itaque, repudiandae molestiae suscipit recusandae praesentium sunt asperiores voluptate ipsa.
            Ratione repudiandae eos nihil obcaecati? Delectus, officiis. Placeat sunt itaque quam impedit corporis qui ex commodi aliquid sapiente maiores, perferendis architecto adipisci et nemo cupiditate accusantium consequuntur iure ipsa quae.
            Dignissimos quidem vitae laudantium tempora dolores consequatur distinctio autem culpa odio officia deserunt esse odit cumque error quae expedita, explicabo provident neque sapiente iusto. Odio non ea autem at explicabo?
            Blanditiis esse officia explicabo velit, voluptatem ipsum nihil minima obcaecati perspiciatis impedit cumque recusandae earum id, quasi excepturi temporibus commodi accusamus, quo labore necessitatibus optio magnam. Reprehenderit porro itaque harum.
            Nisi, dolores corporis? Assumenda voluptates repellat veritatis beatae. A, reprehenderit. Laudantium fuga voluptatum dolore quasi quidem. Culpa a perspiciatis soluta sapiente, placeat eum possimus distinctio accusamus debitis consequuntur perferendis tempore?
            Modi, ipsa voluptatibus. Veniam libero pariatur ab provident blanditiis omnis quae eum assumenda nam voluptate reiciendis consequatur, odit dicta iusto cupiditate enim, cumque consequuntur doloribus iste sequi quidem magni voluptas.
            Quisquam harum ad rerum explicabo magni non tempora ipsam ea maxime similique maiores sapiente quasi voluptas impedit iusto praesentium aliquid et blanditiis quis reiciendis, perspiciatis inventore! Aspernatur illo in voluptates.
            Beatae ad dolorem consectetur adipisci sed iusto mollitia aperiam praesentium impedit vitae? Cupiditate assumenda commodi quidem vitae, est veritatis maiores ut, accusamus nihil placeat libero maxime modi reprehenderit praesentium ex.
            Assumenda blanditiis dolores id repellendus quia officia quam quo minus perferendis nesciunt quos pariatur similique in, nobis eum voluptatibus ut, neque vel beatae itaque deleniti. Ea quasi modi odit doloremque!
            Corporis facere voluptates aliquam nihil accusamus inventore nesciunt doloribus facilis cumque expedita accusantium laboriosam perferendis, perspiciatis vero quo eius tenetur. Repudiandae dolorem est et ducimus quas suscipit culpa labore sint?
            Pariatur non autem delectus nam iusto earum, hic, voluptatibus qui dolores quis necessitatibus maxime, illum exercitationem. Eum rem, dicta ex accusantium, natus repellendus ullam odit aliquam exercitationem consectetur animi magni!
            Optio accusantium ullam, perferendis ut hic tenetur enim excepturi quas dolore ducimus veritatis atque, perspiciatis animi dignissimos repellat esse eligendi, delectus magnam. Eligendi, impedit suscipit. Dolor temporibus voluptate inventore consequatur?
            Omnis, eligendi praesentium asperiores, accusantium, dolorem hic deserunt exercitationem possimus odio iste quisquam doloremque esse optio rem nobis aliquam molestiae iure dolores laborum molestias eveniet assumenda placeat? Ipsa, tenetur alias!
            Deleniti, esse? Tempora deserunt omnis obcaecati officiis velit mollitia neque dolorum? Natus beatae ipsum nisi explicabo. Neque hic, harum quas unde consequuntur necessitatibus numquam, dolore, aut quidem sequi saepe! Facilis.
            Blanditiis cum assumenda adipisci, repudiandae alias quam? Cupiditate eveniet, saepe quidem ratione sit illum blanditiis excepturi repellendus, eum quisquam, ab debitis! Repellendus quidem omnis, quas nisi eos consectetur reiciendis soluta!
            Natus dolorum inventore perferendis in nulla debitis, nostrum corrupti ratione. Tenetur vero labore similique exercitationem, qui atque sint possimus quaerat blanditiis distinctio fugiat quod odio! Accusamus assumenda sed at molestiae.
            Deleniti, inventore quo. Id saepe blanditiis rerum consequatur laudantium ullam dolor non natus? Architecto assumenda ratione odit minus, repellat voluptates deserunt minima dignissimos iusto accusantium explicabo? Aliquam porro aut tempore.
            Ipsum repellendus corrupti alias officiis, animi provident. Iste, consequatur quasi. Officia exercitationem fugiat eius beatae dignissimos optio excepturi molestiae nisi ea tempore possimus voluptatum nam ab consequatur maxime, facere nulla!
            Voluptas nemo magni beatae laborum fuga, tenetur cupiditate saepe consequatur dignissimos necessitatibus velit non quae error quam at! Molestias laudantium, voluptatibus eligendi reprehenderit reiciendis exercitationem voluptas incidunt sed sapiente corporis?
            Reiciendis hic, nihil numquam, exercitationem libero quidem aspernatur, possimus veniam rem sequi officiis perferendis neque. Eos nobis quasi dicta! Illo est sapiente iure asperiores laudantium dignissimos rerum obcaecati adipisci dolores.
            Eius ad minima magnam pariatur quod blanditiis repellat officiis architecto distinctio. Molestias, eius aspernatur ad aperiam nulla omnis, mollitia repellat dolorum necessitatibus sequi, pariatur quae magni dolor. Assumenda, nesciunt excepturi.
            Aliquam accusantium debitis tempore quod dolorum distinctio excepturi pariatur, deserunt, saepe nesciunt recusandae tempora optio eveniet expedita temporibus quas, a libero? Recusandae earum at beatae amet similique! Voluptatibus, molestiae dignissimos.
            Nemo aspernatur in dolor nobis magni ipsam soluta esse doloremque, ullam pariatur asperiores. Vitae ipsam modi eveniet aut earum odit quis ex voluptates? Tempore, corrupti eius facere natus saepe perferendis!
            Odio, adipisci doloribus hic pariatur repellendus voluptatibus velit amet ipsum deserunt earum, neque veritatis, voluptates aliquam vitae beatae! Corrupti quae natus cumque distinctio quam optio quibusdam ratione odio eos repudiandae.
            Repellendus ipsa nostrum laudantium, officiis dignissimos accusamus mollitia pariatur doloribus fugiat deleniti quia rem soluta consequuntur sed! Nam at velit eius dicta nostrum doloremque eaque veniam veritatis, ut recusandae quae?
            Maxime quia maiores eveniet provident! Nemo officia voluptatum molestias assumenda autem exercitationem aspernatur. Debitis ullam placeat natus et ipsa adipisci delectus deleniti dicta, rerum suscipit architecto omnis at, nisi itaque.
            In a esse eveniet voluptas, dolor, aliquid consequuntur accusantium quaerat quisquam exercitationem illo reprehenderit, quis nulla possimus quae doloribus beatae quam fugiat perferendis quos earum laborum id architecto. Vero, nisi.
            Praesentium ab sequi iste laborum rerum sint dolor, reprehenderit, soluta ex molestiae ipsum dignissimos cumque nisi! Eius nesciunt architecto repudiandae itaque, cum pariatur unde quis fuga eum sit ad vero!
            Sequi dolorem numquam libero corrupti? Nam aliquam sunt reiciendis mollitia iste, suscipit ex totam quidem dignissimos fugit dicta tenetur adipisci ipsum deleniti cumque sit non vel quasi consectetur odit quibusdam!
            Temporibus similique dolore, distinctio consequatur consectetur dicta facere provident nobis necessitatibus natus rerum alias debitis magnam at accusantium nulla, velit dolor aliquam maxime optio, asperiores ullam beatae dolores quod. Ullam.
            Repellat odit itaque optio. Eligendi similique dolorum alias ratione. Ab a veniam cumque, error consequatur accusantium alias. Ullam mollitia harum corrupti tenetur ad, iste doloremque, rem eaque architecto temporibus repellendus?
            Maxime, consequatur culpa deserunt nulla dolores placeat dolor laborum reprehenderit voluptates unde, magni quibusdam obcaecati quas veniam sint nobis doloribus possimus? Provident, velit architecto modi dolores cumque laudantium vero libero!
            Voluptates deleniti repudiandae iure ad alias quos, sapiente nihil magnam, nostrum saepe rem eaque beatae accusantium, eius quo! Quisquam laborum doloribus suscipit ratione corporis eius a tempore numquam illum neque!
            Quae, repellat porro nihil voluptatum corrupti rem perspiciatis assumenda numquam quasi ab animi nostrum. At, hic provident asperiores voluptatibus, quos sed quasi mollitia tempora reiciendis explicabo libero dicta qui eligendi?
            Et optio quam eos voluptate veritatis ipsa esse voluptatum temporibus consectetur nam molestias, libero enim laboriosam accusamus, ullam placeat sapiente modi culpa ipsam facere tenetur repellat. Qui ipsam repudiandae optio!
            Reprehenderit aliquam labore perferendis repellendus deleniti culpa, pariatur error accusamus molestias reiciendis et sapiente eius suscipit provident voluptates voluptatum? Perferendis nihil culpa rerum dicta aut nesciunt est corrupti iure reiciendis?
            Perspiciatis, omnis unde! Soluta excepturi quam rerum reiciendis dignissimos quod quidem eius earum tempore, atque facere consequatur ab sunt animi fuga ullam id officia nemo magnam itaque, amet placeat dolorum!
            Voluptatibus neque aliquid fugiat vel, doloremque molestiae labore ut provident natus deleniti quas alias ex sint enim excepturi adipisci temporibus cumque tenetur maiores velit doloribus officia nobis accusantium tempora? Maxime.
            Debitis, illum iure. Beatae est veritatis eaque dicta cumque. Rerum commodi voluptate laboriosam totam harum hic quaerat illo quasi. Maxime natus dolorem debitis placeat eligendi, officiis temporibus assumenda iure hic.
            Quae, provident optio? Voluptatum, esse quos unde blanditiis doloremque veniam ratione quis suscipit ipsam, laboriosam alias aperiam fugiat! Aliquid quaerat asperiores fuga doloribus non numquam pariatur blanditiis officiis odit aut!
            Fugit odio quos soluta, pariatur mollitia autem, inventore vero nostrum animi est minus asperiores tenetur facere temporibus et possimus exercitationem maiores in, explicabo ducimus totam tempore doloribus adipisci ut. Tempore!
            Delectus recusandae debitis magni ab eos at fugit earum deserunt tenetur distinctio consequuntur provident sint reprehenderit soluta obcaecati error, eveniet minima porro consectetur veniam, nobis totam voluptatum. Quaerat, tempora vero.
            Quis consequuntur, aperiam, deleniti doloremque vero nam optio ipsam voluptatum maiores tenetur quod facilis dolores ut non totam! Aut pariatur facilis corporis quos vel impedit, recusandae nobis officiis reprehenderit ab?
            Corrupti voluptatibus distinctio dicta eaque, nobis odit est sed debitis vero nostrum pariatur aliquid rerum quia sapiente eum accusantium sequi, dolor quis ducimus in dignissimos perferendis! A ab accusamus repudiandae.
            Rerum, molestias. Vitae facere cumque soluta voluptatibus non, corporis incidunt nisi aliquid asperiores! Adipisci ut explicabo veniam voluptatum, minima, aliquid corporis numquam quos, voluptate voluptas laborum corrupti alias accusantium similique.
            Omnis voluptate eveniet qui similique, quis eaque impedit sed nam, laborum est sequi consectetur perferendis odit. Quasi fugiat perspiciatis ipsum quae sequi rem est possimus. Amet necessitatibus perferendis commodi ducimus.
            Alias cumque veniam velit ipsum doloribus sapiente magnam eligendi quod cum assumenda libero tempora, earum illum deserunt ipsa ab consequuntur adipisci amet culpa. Possimus, porro assumenda. Beatae repellendus quos nemo.
            Incidunt, vel. Cumque quidem consequatur architecto iste eius amet corporis et a quibusdam praesentium libero perspiciatis, totam ut alias eveniet sunt. Harum illo amet, fuga architecto quibusdam aperiam expedita officia.
            Sunt, quasi. Accusantium, qui. Perferendis, sunt architecto aliquid iste repellendus eveniet veritatis ullam suscipit quos commodi consequuntur assumenda repellat dolore consectetur rem aperiam, obcaecati dignissimos, itaque molestias? Nisi, culpa reprehenderit.
        </>
    )
}

export default ShowSpot

