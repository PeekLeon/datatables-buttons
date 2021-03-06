describe('buttons - collection', function() {
	dt.libs({
		js: ['jquery', 'datatables', 'buttons'],
		css: ['datatables', 'buttons']
	});

	let table;

	describe('Functional tests - Check the defaults', function() {
		dt.html('basic');
		it('Ensure collection button is as expected', function() {
			$('#example').DataTable({
				dom: 'Bfrtip',
				buttons: [
					{
						fade: 0, // saves having to sleep in the tests
						extend: 'collection',
						buttons: [{ text: 'one', action: function() {} }, { text: 'two', action: function() {} }]
					}
				]
			});
			expect($('button.dt-button').length).toBe(1);
			expect($('button.buttons-collection').length).toBe(1);
		});
		it('Contains the expected text', function() {
			expect($('button.dt-button span').text()).toBe('Collection');
		});
		it('Contains the expected buttons', function() {
			$('button.dt-button').click();
			expect($('button.dt-button').length).toBe(3);
		});
		it('Contains the expected button positioning', function() {
			let first = $('div.dt-button-collection button:eq(0)').offset();
			expect($('div.dt-button-collection button:eq(1)').offset().left).toBe(first.left);
			expect($('div.dt-button-collection button:eq(1)').offset().top).toBeGreaterThan(first.left);
		});
		it('Contains the expected colection position', function() {
			let first = $('div.dt-button-collection button:eq(0)').offset();
			expect($('tbody tr:eq(0)').offset().top).toBeGreaterThan(first.left);
		});
		it('Contains the expected background', function() {
			expect($('div.dt-button-background').length).toBe(1);
		});
		it('Contains the expected title', function() {
			expect($('div.dt-button-collection-title').text()).toBe('');
		});
		it('Clicking the button keeps the collection open', function() {
			$('div.dt-button-collection button.dt-button').click();
			expect($('button.dt-button').length).toBe(3);
		});
		it('Collection can be closed', function() {
			$('button.dt-button').click();
			expect($('button.dt-button').length).toBe(1);
		});
	});

	describe('Functional tests - single button', function() {
		dt.html('basic');
		it('action', function() {
			table = $('#example').DataTable({
				dom: 'Bfrtip',
				buttons: [
					{
						fade: 0, // saves having to sleep in the tests
						extend: 'collection',
						buttons: [
							{
								text: 'search',
								action: function() {
									table.search('cox').draw();
								}
							}
						]
					}
				]
			});
			$('button.dt-button').click();
			$('div.dt-button-collection button.dt-button').click();
			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Ashton Cox');
		});

		// Disabled due to DD-820
		// dt.html('basic');
		// it('autoClose', function() {
		// 	table = $('#example').DataTable({
		// 		dom: 'Bfrtip',
		// 		buttons: [
		// 			{
		// 				fade: 0, // saves having to sleep in the tests
		// 				extend: 'collection',
		// 				buttons: [{ text: 'null', action: function() {let a = table.rows().count()} }],
		// 				autoClose: true
		// 			}
		// 		]
		// 	});
		// 	$('button.dt-button').click();
		// 	$('div.dt-button-collection button.dt-button').click();
		// 	expect($('button.dt-button').length).toBe(1);
		// });

		dt.html('basic');
		it('background', function() {
			table = $('#example').DataTable({
				dom: 'Bfrtip',
				buttons: [
					{
						fade: 0, // saves having to sleep in the tests
						extend: 'collection',
						buttons: [{ text: 'null', action: function() {} }],
						background: false
					}
				]
			});
			$('button.dt-button').click();
			expect($('div.dt-button-background').length).toBe(0);
		});

		dt.html('basic');
		it('backgroundClassName', function() {
			table = $('#example').DataTable({
				dom: 'Bfrtip',
				buttons: [
					{
						fade: 0, // saves having to sleep in the tests
						extend: 'collection',
						buttons: [{ text: 'null', action: function() {} }],
						backgroundClassName: 'test-background-class'
					}
				]
			});
			$('button.dt-button').click();
			expect($('div.dt-button-background').length).toBe(0);
			expect($('div.test-background-class').length).toBe(1);
		});

		dt.html('basic');
		it('className - applies to collection button', function() {
			table = $('#example').DataTable({
				dom: 'Bfrtip',
				buttons: [
					{
						fade: 0, // saves having to sleep in the tests
						extend: 'collection',
						buttons: [{ text: 'null', action: function() {} }],
						className: 'test-class'
					}
				]
			});
			expect($('button.test-class').length).toBe(1);
		});
		it('className - does not apply to buttons in the collection', function() {
			$('button.dt-button').click();
			expect($('button.test-class').length).toBe(1);
		});

		dt.html('basic');
		it('collectionLayout - fixed', function() {
			table = $('#example').DataTable({
				dom: 'Bfrtip',
				buttons: [
					{
						fade: 0, // saves having to sleep in the tests
						extend: 'collection',
						buttons: [
							{ text: 'one', action: function() {} },
							{ text: 'two', action: function() {} },
							{ text: 'three', action: function() {} },
							{ text: 'four', action: function() {} }
						],
						collectionLayout: 'fixed'
					}
				]
			});
			$('button.dt-button').click();
			let first = $('div.dt-button-collection button:eq(0)').offset();
			expect($('tbody tr:eq(0)').offset().top).toBeLessThan(first.left);
		});

		dt.html('basic');
		it('collectionLayout - two-column', function() {
			table = $('#example').DataTable({
				dom: 'Bfrtip',
				buttons: [
					{
						fade: 0, // saves having to sleep in the tests
						extend: 'collection',
						buttons: [
							{ text: 'one', action: function() {} },
							{ text: 'two', action: function() {} },
							{ text: 'three', action: function() {} },
							{ text: 'four', action: function() {} }
						],
						collectionLayout: 'two-column'
					}
				]
			});
			$('button.dt-button').click();
			expect($('div.dt-button-collection.two-column').length).toBe(1);
		});
		it('collectionLayout - two-column - horizontal position', function() {
			let firstColumn = $('div.dt-button-collection button:eq(0)').offset();
			expect($('div.dt-button-collection button:eq(1)').offset().left).toBe(firstColumn.left);

			let secondColumn = $('div.dt-button-collection button:eq(2)').offset();
			expect($('div.dt-button-collection button:eq(3)').offset().left).toBe(secondColumn.left);

			expect(firstColumn.left).toBeLessThan(secondColumn.left);
		});
		// disabled because of DD-825
		// it('collectionLayout - two-column - vertical position', function() {
		// 	let firstRow = $('div.dt-button-collection button:eq(0)').offset();
		// 	expect($('div.dt-button-collection button:eq(2)').offset().top).toBe(firstRow.top);

		// 	let secondRow = $('div.dt-button-collection button:eq(1)').offset();
		// 	expect($('div.dt-button-collection button:eq(3)').offset().top).toBe(secondRow.top);

		// 	expect(firstRow.top).toBeLessThan(secondRow.left);
		// });

		dt.html('basic');
		it('collectionLayout - three-column', function() {
			table = $('#example').DataTable({
				dom: 'Bfrtip',
				buttons: [
					{
						fade: 0, // saves having to sleep in the tests
						extend: 'collection',
						buttons: [
							{ text: 'one', action: function() {} },
							{ text: 'two', action: function() {} },
							{ text: 'three', action: function() {} },
							{ text: 'four', action: function() {} }
						],
						collectionLayout: 'three-column'
					}
				]
			});
			$('button.dt-button').click();
			expect($('div.dt-button-collection.three-column').length).toBe(1);
		});

		// Disabled because of DD-826
		// it('collectionLayout - three-column - horizontal position', function() {
		// 	let firstColumn = $('div.dt-button-collection button:eq(0)').offset();
		// 	let secondColumn = $('div.dt-button-collection button:eq(1)').offset();
		// 	expect($('div.dt-button-collection button:eq(2)').offset().left).toBe(secondColumn.left);
		// 	let thirdColumn = $('div.dt-button-collection button:eq(3)').offset();

		// 	expect(firstColumn.left).toBeLessThan(secondColumn.left);
		// 	expect(secondColumn.left).toBeLessThan(thirdColumn.left);
		// 	expect(secondColumn.left - firstColumn.left).toBe(thirdColumn.left - secondColumn.left);
		// });

		// disabled because of DD-825
		// it('collectionLayout - two-column - vertical position', function() {
		// 	let firstRow = $('div.dt-button-collection button:eq(0)').offset();
		// 	expect($('div.dt-button-collection button:eq(1)').offset().top).toBe(firstRow.top);
		// 	expect($('div.dt-button-collection button:eq(3)').offset().top).toBe(firstRow.top);
		// 	let secondRow = $('div.dt-button-collection button:eq(2)').offset();

		// 	expect(firstRow.top).toBeLessThan(secondRow.left);
		// });

		// Disabled due to DD-827
		// dt.html('basic');
		// it('collectionLayout - four-column', function() {
		// 	table = $('#example').DataTable({
		// 		dom: 'Bfrtip',
		// 		buttons: [
		// 			{
		// 				fade: 0, // saves having to sleep in the tests
		// 				extend: 'collection',
		// 				buttons: [
		// 					{ text: 'one', action: function() {} },
		// 					{ text: 'two', action: function() {} },
		// 					{ text: 'three', action: function() {} },
		// 					{ text: 'four', action: function() {} },
		// 					{ text: 'five', action: function() {} }

		// 				],
		// 				collectionLayout: 'four-column'
		// 			}
		// 		]
		// 	});
		// 	$('button.dt-button').click();
		// 	expect($('div.dt-button-collection.four-column').length).toBe(1);
		// });
		// it('collectionLayout - three-column - horizontal position', function() {
		// 	let firstColumn = $('div.dt-button-collection button:eq(0)').offset();
		// 	let secondColumn = $('div.dt-button-collection button:eq(1)').offset();
		// 	expect($('div.dt-button-collection button:eq(2)').offset().left).toBe(secondColumn.left);
		// 	let thirdColumn = $('div.dt-button-collection button:eq(3)').offset();

		// 	expect(firstColumn.left).toBeLessThan(secondColumn.left);
		// 	expect(secondColumn.left).toBeLessThan(thirdColumn.left);
		// 	expect(secondColumn.left - firstColumn.left).toBe(thirdColumn.left - secondColumn.left);
		// });
		// disabled because of DD-825
		// it('collectionLayout - two-column - vertical position', function() {
		// 	let firstRow = $('div.dt-button-collection button:eq(0)').offset();
		// 	expect($('div.dt-button-collection button:eq(1)').offset().top).toBe(firstRow.top);
		// 	expect($('div.dt-button-collection button:eq(3)').offset().top).toBe(firstRow.top);
		// 	let secondRow = $('div.dt-button-collection button:eq(2)').offset();

		// 	expect(firstRow.top).toBeLessThan(secondRow.left);
		// });

		// collectionlayout with collectiontitle
		// dt.html('basic');
		// it('collectionLayout', function() {
		// 	table = $('#example').DataTable({
		// 		dom: 'Bfrtip',
		// 		buttons: [
		// 			{
		// 				fade: 0, // saves having to sleep in the tests
		// 				extend: 'collection',
		// 				buttons: [
		// 					{ text: 'one', action: function() {} },
		// 					{ text: 'two', action: function() {} },
		// 					{ text: 'three', action: function() {} },
		// 					{ text: 'four', action: function() {} }
		// 				],
		// 				collectionLayout: 'two-column',
		// 				collectionTitle: 'test title'
		// 			}
		// 		]
		// 	});
		// 	expect($('button.test-class').length).toBe(1);
		// });

		// dt.html('basic');
		// it('collectionTitle', function() {
		// 	table = $('#example').DataTable({
		// 		dom: 'Bfrtip',
		// 		buttons: [
		// 			{
		// 				fade: 0, // saves having to sleep in the tests
		// 				extend: 'collection',
		// 				buttons: [{ text: 'null', action: function() {} }],
		// 				collectionTitle: 'test title'
		// 			}
		// 		]
		// 	});
		// 	$('button.dt-button').click();
		// 	expect($('div.dt-button-collection-title').text()).toBe('test title');
		// });

		// disabled due to DD-828
		// need to write tests - ensure goes up and down (check with and without setting)
		// dt.html('basic');
		// it('dropup', function() {
		// 	table = $('#example').DataTable({
		// 		dom: 'Bfrtip',
		// 		buttons: [
		// 			{
		// 				fade: 0, // saves having to sleep in the tests
		// 				extend: 'collection',
		// 				buttons: [{ text: 'null', action: function() {} }],
		// 				dropup: true
		// 			}
		// 		]
		// 	});
		// });

		dt.html('basic');
		it('fade', async function() {
			table = $('#example').DataTable({
				dom: 'Bfrtip',
				buttons: [
					{
						extend: 'collection',
						buttons: [{ text: 'null', action: function() {} }],
						fade: 500
					}
				]
			});

			$('button.dt-button').click();

			// appears immediately, just takes longer to be displayed
			expect($('button.dt-button').length).toBe(2);

			$('button.dt-button').click();
			expect($('button.dt-button').length).toBe(2);

			await dt.sleep(1000);

			expect($('button.dt-button').length).toBe(1);
		});

		dt.html('basic');
		it('postfixButtons', async function() {
			table = $('#example').DataTable({
				dom: 'Bfrtip',
				buttons: [
					{
						fade: 0, // saves having to sleep in the tests
						extend: 'collection',
						buttons: [{ text: 'one', action: function() {} }],
						postfixButtons: [{ text: 'post', action: function() {} }]
					}
				]
			});

			$('button.dt-button').click();

			expect($('button.dt-button').length).toBe(3);
			expect($('div.dt-button-collection button:eq(0)').text()).toBe('one');
			expect($('div.dt-button-collection button:eq(1)').text()).toBe('post');
		});

		dt.html('basic');
		it('prefixButtons', async function() {
			table = $('#example').DataTable({
				dom: 'Bfrtip',
				buttons: [
					{
						fade: 0, // saves having to sleep in the tests
						extend: 'collection',
						buttons: [{ text: 'one', action: function() {} }],
						prefixButtons: [{ text: 'pre', action: function() {} }]
					}
				]
			});

			$('button.dt-button').click();

			expect($('button.dt-button').length).toBe(3);
			expect($('div.dt-button-collection button:eq(0)').text()).toBe('pre');
			expect($('div.dt-button-collection button:eq(1)').text()).toBe('one');
		});

		dt.html('basic');
		it('prefixButtons and postFixButtons', async function() {
			table = $('#example').DataTable({
				dom: 'Bfrtip',
				buttons: [
					{
						fade: 0, // saves having to sleep in the tests
						extend: 'collection',
						buttons: [{ text: 'one', action: function() {} }],
						postfixButtons: [{ text: 'post', action: function() {} }],
						prefixButtons: [{ text: 'pre', action: function() {} }]
					}
				]
			});

			$('button.dt-button').click();

			expect($('button.dt-button').length).toBe(4);
			expect($('div.dt-button-collection button:eq(0)').text()).toBe('pre');
			expect($('div.dt-button-collection button:eq(1)').text()).toBe('one');
			expect($('div.dt-button-collection button:eq(2)').text()).toBe('post');
		});

		dt.html('basic');
		it('Text', function() {
			$('#example').DataTable({
				dom: 'Bfrtip',
				buttons: [
					{
						fade: 0, // saves having to sleep in the tests
						extend: 'collection',
						buttons: [{ text: 'button1', action: function() {} }, { text: 'button2', action: function() {} }],
						text: 'Collection Text'
					}
				]
			});
			expect($('button.dt-button span').text()).toBe('Collection Text');
		});
	});
});
