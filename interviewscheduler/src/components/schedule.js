import React ,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { DeleteOutline , Edit } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
const Schedule = () => {
  let history = useNavigate();
    const [schedule , setschedule] = useState(null);
    useEffect(() => {
        fetch('http://localhost:3000/allinterview' ,{
            method: 'get',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => res.json())
        .then((data) => {
            data.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.Date) - new Date(a.Date);
              });
            setschedule(data);
            console.log(data);
        })
    },[]);

    const handleDelete = async (id) => {
        const res = await fetch(`http://localhost:3000/delete/${id}` , {
          method: 'delete',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        })
        const response = await res.json();
        console.log(response);
        setschedule(response);
        toast.success("Interview Deleted Successfully",{position: "top-right",
        theme:'dark',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true})
    }
    return ( schedule?.length === 0 ? (<div style={{display:'flex' , flexDirection:'row' , justifyContent:'center',marginTop:'1rem'}}><Typography>No Interviews Scheduled Yet !</Typography></div>):(
        <div style={{ display:'flex' , flexDirection : 'row', flexWrap:'wrap' , maxWidth:'1000px' ,margin:'10px auto'}}>
          <ToastContainer/>
            {schedule?.map(e => (
                 <Card sx={{ width: '40%' , minWidth:275 , color:'white', backgroundColor:'#585858' , margin:'1rem'}} key={e._id}>
                 <CardContent>
                 <span style={{float:'right'}} onClick={() => handleDelete(e._id)}><DeleteOutline/></span>
                 <span style={{float:'right' ,marginRight:'0.5rem'}} onClick={() => history('/edit')}><Edit/></span>
                   <Typography variant="h5" component="div">
                     {e.Participant}
                   </Typography>
                   <Typography gutterBottom>{`Date : ${new Date(e.StartTime).toLocaleDateString()}`}</Typography>
                   <Typography sx={{ fontSize: 14 ,mb: 1}} >
                     {`From : ${new Date(e.StartTime).toLocaleTimeString()}`}
                   </Typography>
                   <Typography sx={{ fontSize: 14 ,mb: 1 }}>
                   {`To : ${new Date(e.EndTime).toLocaleTimeString()}`}
                   </Typography>
                   <Typography variant="body2">
                     {`Regarding : ${e.Reason}`}
                   </Typography>
                 </CardContent>
               </Card>
            ))}
        </div>)
    )
}

export default Schedule;