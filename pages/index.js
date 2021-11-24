import Login from '../components/login'

export default function Home() {
  return (
    <>
      <div className="container">
        <Login />
      </div>
      <style JSX>{`
        .container {
          display: flex;
          justify-content:center;
          align-items:center;
          padding: 2rem;
          height: 100vh;
          padding: 0px;
        }
      `}
      </style>
    </>
  )
}
