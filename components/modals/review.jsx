import UserImage from '../user-image'
const Review = ({ authorName, date, grade, comment }) => {
    return (
        <>
            <div className="flex flex-col items-start gap-y-2">
                <div className="flex gap-x-2 justify-center items-center">
                    <UserImage width={'w-10'} height={'h-10'} />
                    <div className="flex flex-col just">
                        <p className="font-semibold">John · 4.8</p>
                        <p className="text-sm font-light text-greyText ">February 2022</p>
                    </div>
                </div>

                <div className="text-sm leading-6	">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero, eius
                    aliquam totam accusantium explicabo accusamus enim consequuntur
                    repellat porro mollitia debitis, minima id deleniti provident eaque
                    velit illum iste! Architecto. Dignissimos expedita ea autem cum
                    nesciunt earum rem sed saepe laboriosam, qui corporis labore enim,
                    recusandae id adipisci quam voluptatum temporibus dolorem eveniet
                    architecto? Magni vero ullam quasi illo voluptatem. Officiis dolorem
                    molestiae architecto laboriosam incidunt neque, cumque dignissimos
                    voluptatum quisquam nam qui aliquid expedita assumenda cupiditate
                    error asperiores in. Odit exercitationem aperiam ab omnis tempora
                    voluptate, quisquam dolorum voluptas.
                </div>
            </div>
        </>
    )
}

export default Review
