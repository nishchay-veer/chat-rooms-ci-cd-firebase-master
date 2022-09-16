import React , {useState, useEffect} from 'react';
import Sidebar from './Sidebar';
import ChatSection from './ChatSection';
import './myfunction.css';

const MyFunction = () => {
    const [isDesktop, setDesktop] = useState(window.innerWidth > 700);

    const updateMedia = () => {
        setDesktop(window.innerWidth > 700);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    return (
        <div className='myfunction__main'>
            {isDesktop ? (
                <div>
                    <Sidebar />,
                    <ChatSection />
                </div>
            ) : (
                <div>
                    <ChatSection />

                </div>
            )}
        </div>
    );
}
export default MyFunction;

