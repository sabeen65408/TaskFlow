function StatCard({
    title,
    value,
    color
}) {

    return (

        <div
            style={{
                background: color,
                color: "white",
                padding: "20px",
                borderRadius: "15px",
                flex:1,
                boxShadow:"0 10px 25px rgba(0,0,0,.1)"
            }}
        >

            <h4>{title}</h4>

            <h1>{value ?? 0}</h1>

        </div>

    );

}

export default StatCard;