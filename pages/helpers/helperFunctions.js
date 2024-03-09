

export const getMyDate = (new_date = new Date()) => {//function getMyDate(new_date = new Date())

  var str_date = new_date.getFullYear()+"-"+(new_date.getMonth()+1)+"-"+new_date.getDate();
  ma_date = new Date(str_date);
  console.log("////////////////////////////////////////");
  return ma_date;
}


export function getStrDate(new_date = new Date())
{
  let my_month  = new_date.getMonth()+1;
  let day_number = new_date.getDate();
  var str_month = my_month.toString().padStart(2,'0');
  var str_daynumber = day_number.toString().padStart(2,'0');
  var str_date = new_date.getFullYear()+"-"+(str_month)+"-"+str_daynumber;  
  console.log("////////////////// STR DATE //////////////////////");
  return str_date;
}

export function getWeekRange(date_du_jour = new Date()) {
    const currentDate = date_du_jour;//const currentDate = new Date();
    const currentDay = currentDate.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
  
    // Calculate the date of Monday
    const monday = new Date(currentDate);
    if (currentDay === 0) { // If it's Sunday
      monday.setDate(currentDate.getDate() - 6); // Go back 6 days
    } else {
      monday.setDate(currentDate.getDate() - currentDay + 1);
    }
  
    // Calculate the date of Sunday
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6); // Add 6 days to get to Sunday
  
    return { monday, sunday };
  }
  
  export function formatDate(date) {
    const months = [
/*      'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'*/
      '01','02','03','04','05','06','07','08','09','11','12'
    ];
    
    const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const dayOfWeek = days[date.getDay()];
    const dayOfMonth = date.getDate();
  
    //return `${dayOfWeek} ${dayOfMonth}/${month}/${year}`;
    return `${dayOfMonth}/${month}/${year}`;
  }
  
