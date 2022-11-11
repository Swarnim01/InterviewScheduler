import { MenuItem, TextField , Button } from '@mui/material';
import React ,{useEffect, useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Edit = () => {
    const [participants , setparticipants] = useState([]);
    const [selected , setselected] = useState("");
    const [date , setdate] = useState(null);
    const [st ,setst] = useState(null);
    const [et ,setet] = useState(null);
    const [title , settitle] = useState(null);
    useEffect(() => {
        fetch('http://localhost:3000/participants' ,{
            method: 'get',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => res.json())
        .then((data) => {
            setparticipants(data);
        })
    },[]);
    const handleclick = async () => {
        try{
        const doc = await fetch('http://localhost:3000/addinterview',{
            method: 'post',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              selected,
              date,
              st,
              et,
              title
            }) 
        })
        const res = await doc.json();
        console.log(res);
        if(res?.error)
        toast.error(`${res?.error}`,{position: "top-right",
        theme:'dark',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        })
        else
        toast.success("Interview Scheduled Successfully",{position: "top-right",
        theme:'dark',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        })
    }
    catch(err){
        console.log(err);
    }
        
    }
    const handlest = (e) => {
        const hours = e.slice(0, 2);
        const minutes = e.slice(3);
        var event = new Date(date);
        event.setHours(hours , minutes);
        setst(event);
        console.log(event.toISOString());
    }
    const handleet = (e) => {
        const hours = e.slice(0, 2);
        const minutes = e.slice(3);
        var event = new Date(date);
        event.setHours(hours , minutes);
        setet(event);
        console.log(event.toISOString());
    }
    return (
       <div style={{maxWidth: '600px',
       margin:'50px auto' , display:'flex' , flexDirection:'column', alignItems:'center'  }}>
        <h3>Edit Interview Schedule </h3>
       <TextField id="standard-basic" label='Date' variant="standard" sx={{ m: 1, width: '20rem' ,marginTop:'2rem'}} type='date' InputLabelProps={{ shrink: true }} onChange={(e)=> {setdate(new Date(e.target.value))}}  />
       <TextField id="standard-basic" label="Start Time" variant="standard" sx={{ m: 1, width: '20rem' }} type='time' InputLabelProps={{ shrink: true }}  onChange={(e)=> {handlest(e.target.value)}} />
       <TextField id="standard-basic" label="End Time" variant="standard" sx={{ m: 1, width: '20rem' }} type='time' InputLabelProps={{ shrink: true }}  onChange={(e)=> {handleet(e.target.value)}} />
       <TextField id="standard-basic" label="Select Participants" select variant="standard" sx={{ m: 1, width: '20rem' }} disabled value={selected}  onChange={(e)=> {setselected(e.target.value)}}>
        {participants.map(e => (
            <MenuItem key={e._id} value={e.Name}>{e.Name}</MenuItem>
        ))}
       </TextField>
       <ToastContainer/>
       <TextField id="standard-basic" label="Interview Title" variant="standard" sx={{ m: 1, width: '20rem' , marginBottom:'2rem' }}  onChange={(e)=> {settitle(e.target.value)}}/>
       <Button variant="contained" size='small' style={{backgroundColor:'black'}} >OK</Button>
       <Button variant="contained" size='small' style={{backgroundColor:'black'}} >Cancel</Button>
       </div>
    )
}
export default Edit;