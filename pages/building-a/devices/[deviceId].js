import Link from 'next/link';
import Script from 'next/script';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../../../components/layout';
import styles from '../../../components/layout.module.css';
import { useState } from 'React';

import { useRouter } from 'next/router';

const PageTitle = "DeviceId";


function Device({data}) {

  const router = useRouter()
  const { deviceId } = router.query

  // const [newData, setData] = useState(data);
  const fetchData = async() => {
    const tmp = await fetch(`http://127.0.0.1:3001/apis/devices`);
    console.log(tmp);
    const turnedOn = await fetch(`http://127.0.0.1:3001/apis/devices/update`, 
      {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
            deviceId: deviceId,
            LightOutput: 30
        })
      }
    );
    // const jsonData = turnedOn.json();
    return [];
  };

  function handleClick(event) {
    event.preventDefault();
    fetchData(deviceId);
  }
    function turnOn() {
      event.preventDefault();
      fetchData(deviceId);
    }

    function addNew() {
        console.log("clicked");
    }
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
             <a href={"/building-a/devices/new-device?id="+data.deviceId+"&l="+data.level+"&b="+data.building+"&o=30"}>Add New on this level</a>
            </div>
        </div>
    </div>
    
    <div className="main_content">
        <div class="container">
          <div class="card">
            
            <h4>DeviceId: {data.deviceId}</h4>
             {data.LightOutput > 0 ? (<h4><div><Image src="/on.svg" height={30} width={30} /><code className="heading2Xl">{data.onCounter}</code></div></h4>):(<div><Image src="/off.svg" height={30} width={30} /><code className="heading2Xl">{data.offCounter}</code></div>)}
            
            <h4>Created: {data.created}</h4>
            <h4>Wattage: {data.Wattage}</h4>
            <h4>LightOutput: {data.LightOutput}</h4>
            <h4>Turned On Time: {data.turnedOnTime}</h4>
            {data.LightOutput == 0 ? (<h4><a href={"/building-a/devices/on?deviceId=" + deviceId}>Turn it On Now</a></h4>) : (<h4><a href={"/building-a/devices/off?deviceId=" +deviceId}>Turn it Off</a></h4>)}
          </div>
        </div>
    </div>
    </Layout>);
}

export async function getServerSideProps(context) {
  const deviceId = context.query.deviceId;
  const res = await fetch(`http://127.0.0.1:3001/apis/devices/${deviceId}`);
  const data = await res.json();
    // const res2 = await fetch(`http://127.0.0.1:3001/apis/devices/all`);
    // const devices = await res2.json();

    // data.devices = devices.devices;
    return {props: {data}};
}

export default Device;