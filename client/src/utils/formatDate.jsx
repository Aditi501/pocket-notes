
export const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; 
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; 
  
    const time = `${hours}:${formattedMinutes} ${period}`;


    return `${day} ${month}, ${year} ● ${time}`;
  };
  