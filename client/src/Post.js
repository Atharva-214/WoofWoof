import {Link} from "react-router-dom";

export default function Post({_id,title,gender,breed,age,summary,cover,content,createdAt,author}) {
 
  const formatDate = (dateString) => {
    const postDate = new Date(dateString);
    const day = postDate.getDate();
    const month = postDate.toLocaleString('default', { month: 'long' });
    const year = postDate.getFullYear();
    return `${day} ${month} ${year}`;
  };
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={'http://localhost:4000/'+cover} alt=""/>
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
        <h2>{title}</h2>
        </Link>
        <div className="t">{formatDate(createdAt)}</div>
        <div className="basics">
        {breed}, {gender}, {age} years
        </div>
        <p className="info">
          {/* <h3>Owner Details</h3> */}
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAyElEQVR4nO3TPUoDURSG4SeRFNraWzlTZg+pRAKptNdmINbaJaXuIKQzmMoftBYLtzBFFpC4Exk4RYqBTG6wkbzwweG78N5T3Muev6aNAh+RIrpk3vCOXqSSvqTK+vhGa61rRXeeInzAsKa/wX2K8A6jmn6M2xRhhhVO1rpqXuJUIpf4wRPmMV/YkWMMItW8MxnOItWczDUWKPEcKaO72kZ0FA/6C92a826cveKwiXCGyYYvdoApHjfJcnyi0+DiTmyaN9nyH/ML3Lgff5cLC5wAAAAASUVORK5CYII="></img>
          <a className="author">   {author.username}</a>
          
          {/* <time>{formatISO9075(new Date(createdAt))}</time> */}
        </p>
        
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}