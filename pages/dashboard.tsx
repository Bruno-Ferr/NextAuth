import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { withSSRAuth } from "../utils/withSSRAuth"
import { api } from "../services/apiClient";
import { setupAPIClient } from "../services/api";
import { useCan } from "../hooks/useCan";
import { Can } from "../components/Can";

export default function Dashboard() {
  const { user, signOut, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    api.get('/me')
      .then(res => console.log(res))
  },[])

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>

      <button onClick={signOut}>SignOut</button>

      <Can permissions={['metrics.list']}>
        <div>Metrics</div>
      </Can>
    </>
  )
}


export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  const res = await apiClient.get('/me')

  return {
    props: {}
  }
})