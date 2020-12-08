(function ($) {
	$.entwine('ss', function ($) {

		$('.image-coord-field .grid').entwine({

			onmatch: function () {
				this.updateGrid();
			},
			getCoordField: function (axis) {
				var fieldName = (axis.toUpperCase() === 'Y') ? this.data('yFieldName') : this.data('xFieldName');
				var fieldSelector = "input[name='" + fieldName + "']";
				return this.closest('.image-coord-fieldgroup').find(fieldSelector);
			},
			updateGrid: function () {
				var grid = $(this);

				// Get coordinates from text fields
				var focusX = grid.getCoordField('x').val();
				var focusY = grid.getCoordField('y').val();

				// Calculate background positions
				var backgroundWH = 605; // Width and height of grid background image
				var bgOffset = Math.floor(-backgroundWH / 2);
				var fieldW = grid.width();
				var fieldH = grid.height();
				var leftBG = this.data('cssGrid') ? bgOffset + (focusX * fieldW) : bgOffset + ((focusX / 2 + .5) * fieldW);
				var topBG = this.data('cssGrid') ? bgOffset + (focusY * fieldH) : bgOffset + ((-focusY / 2 + .5) * fieldH);

				// Line up crosshairs with click position
				grid.css('background-position', leftBG + 'px ' + topBG + 'px');
			},
			onclick: function (e) {
				var grid = $(this);
				var fieldW = grid.width();
				var fieldH = grid.height();

				// Calculate ImageCoord coordinates
				var offsetX = e.pageX - grid.offset().left;
				var offsetY = e.pageY - grid.offset().top;
				var focusX = this.data('cssGrid') ? offsetX / fieldW : (offsetX / fieldW - .5) * 2;
				var focusY = this.data('cssGrid') ? offsetY / fieldH : (offsetY / fieldH - .5) * -2;

				// Pass coordinates to form fields
				this.getCoordField('x').val(focusX);
				this.getCoordField('y').val(focusY);

				// Update focus point grid
				this.updateGrid();
			}
		});
	});
}(jQuery));
