
import uuid from 'react-native-uuid';

export const uniqueId = () => {


    
    const unique_id = uuid.v4();
    return unique_id.slice(0, 8);
};
