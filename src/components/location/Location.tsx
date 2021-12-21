import React, { useContext } from "react";
import StateContext from '../../context/state'
import { Skeleton } from "antd";


const Location = () => {
    const { geoState, generalState } = useContext(StateContext)

    return (
        <Skeleton loading={generalState.loading} active avatar round paragraph>
            <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${geoState.lat},${geoState.lng}&zoom=13&size=800x360&maptype=roadmap
                    &markers=color:black%7C${geoState.lat},${geoState.lng}
                    &key=AIzaSyBpwGjBl_vt1yMDqD25Vy-gnzvnJK_vceI`}
            />
        </Skeleton>
    )
}

export default Location