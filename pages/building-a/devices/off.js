import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../../../components/layout';
import styles from '../../../components/layout.module.css';

const PageTitle = "DeviceId";


function Off({data}) {

    return (
    <Layout>
      <Head>
        <title>{PageTitle}</title>
      </Head>
      <div className={styles.left_container}>
        <div>
        <div className={styles.backToHome}>
          <Link href="/building-a">
            <a>← Back to {data.building}</a>
          </Link>
        </div>
            <h1>Device</h1>
            <p></p>
            {}
             <div class="description">
             <br></br><br></br>
            <h3>Level: {data.level}</h3>
             <button onClick={addNew}>Add New on this level</button>
            </div>
        </div>
    </div>
    
    <div className="main_content">
        <div class="container">
          <div class="card">
            
            <h4>DeviceId: {data.deviceId}</h4>
            {data.LightOutput > 0 ? (<h4><div><Image src="/on.svg" height={30} width={30} /><code className="heading2Xl">{data.onCounter}</code></div></h4>):(<div><Image src="/off.svg" height={30} width={30} /><code className="heading2Xl">{data.offCounter}</code></div>)}
            
            <h4>created: {data.created}</h4>
            <h4>Wattage: {data.Wattage}</h4>
            <h4>LightOutput: {data.LightOutput}</h4>
            <h4>Turned On Time: {data.turnedOnTime}</h4>
            {data.LightOutput == 0 ? (<h4><a onClick={turnOn}>Turn it On Now</a></h4>) : (<h4><a href="">Turn it Off</a></h4>)}
          </div>
        </div>
    </div>
    </Layout>);
}

export async function getServerSideProps(context) {
  const deviceId = context.query.deviceId;
  const res = await fetch(`http://127.0.0.1:3001/apis/devices/update`,
  {
    headers: {
      'Content-Type': "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      deviceId: deviceId,
      LightOutput: 0
    })
  });
  const data = await res.json();
  if (data.success) {
    return {
      redirect: {
        destination: '/building-a/devices/' + deviceId,
        permanent: false,
      }
    };
  }
    // const res2 = await fetch(`http://127.0.0.1:3001/apis/devices/all`);
    // const devices = await res2.json();

    // data.devices = devices.devices;
    return {props: {data}};
}

export default Off;