import React from 'react';

export const App: React.FC = () => (
	<div className="flex items-center" style={{ backgroundColor: '#48bb78', height: '100vh' }}>
		<div className="flex-col max-w-md p-6 mx-auto bg-white rounded-lg shadow-xl">
			<h4 className="text-xl font-bold leading-tight text-gray-900">React Starter!</h4>
			<p className="text-base leading-normal text-gray-600 md:hover:text-red-700">
				YEE (and I cannot stress this enough) HAW
			</p>
		</div>
	</div>
);
