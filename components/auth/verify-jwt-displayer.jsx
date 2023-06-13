import Spinner from '../spinner'

const VerifyJWTDisplay = ({ error, isLoading, data }) => {
    // SAY HERE YOU HAVE RECEIVED CONFIRMATION EMAIL
    if (error) return <div>Error</div>
    // if (1 + 1 === 2) return <Spinner color={'border-t-primary text-2xl w-8 h-8'} />
    if (data) return <div>{data}</div>
}

export default VerifyJWTDisplay
