'use client';
import React from 'react';

const venues = [
    { id: 1, name: 'Venue 1', image: 'path/to/image1.jpg' },
    { id: 2, name: 'Venue 2', image: 'path/to/image2.jpg' },
    { id: 3, name: 'Venue 3', image: 'path/to/image3.jpg' },
    { id: 4, name: 'Venue 4', image: 'path/to/image4.jpg' },
    { id: 5, name: 'Venue 5', image: 'path/to/image5.jpg' },
    { id: 6, name: 'Venue 6', image: 'path/to/image6.jpg' },
];

const Page = () => {
    return (
        <>
            <div>
                <p>
            The Silver Jubilee Tower adds glory to the magnificent and beautiful campus of VIT. Located at one end of the campus and adjacent to the Girl’s Hostels, it was inaugurated by Hon’ble Shri G.K Vasan, Minister for Shipping, Govt. of India on 29th September, 2009 in the presence of Hon’ble Shri Pranab Mukherjee, former Finance Minister and the Ex-President of our country. Apart from enormous and spacious classrooms, brilliantly designed smart classrooms and galleries add to the list of unique features of SJT.
                </p>

                <p>
                    One would see computer labs of international standards in this building. Located adjacent to the playground and garden, it gives an aesthetic view of the surroundings, and serves as a stress buster and an ideal place for students to learn.
                </p>

                <p>
                    It houses the schools of SITE, SCOPE, COE office, Academic office, VIT BS, PAT Office, and SDC.
                </p>
            </div>
            <div className="grid grid-cols-4 gap-4 p-4">
                {venues.map((venue) => (
                    <div
                        key={venue.id}
                        className="text-center border border-gray-300 rounded-lg overflow-hidden bg-gray-100 shadow-md"
                    >
                        <img
                            src={venue.image}
                            alt={venue.name}
                            className="w-full h-auto"
                        />
                        <p className="mt-2 mb-2 text-lg font-semibold text-gray-800">
                            {venue.name}
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Page;
