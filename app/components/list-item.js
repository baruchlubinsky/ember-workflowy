import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'li',
	didInsertElement: function() {
		var self = this;
		var elem = self.get('element');
		var inputs = Ember.$(elem).find('textarea');
		inputs.autosize({append: ''});
		inputs.first().keydown(function(event) {
			var item = self.get('data');
			var store = item.get('store');
			var parent = item.get('parent');
			var siblings = parent.get('children');
			var index = siblings.indexOf(item);
			if(event.which === 13 && !event.shiftKey) { 	// Enter
				event.preventDefault();
				var caret = this.selectionStart;
				var end = this.selectionEnd;
				if(caret === 0 && end === 0)
				{
					siblings.insertAt(index, store.createRecord('listItemDatum', {}));
				} else if (caret === end) {
					siblings.insertAt(index + 1, store.createRecord('listItemDatum', {}));
				} else {
					var oldText = item.get('text');
					var newItem = oldText.substring(caret, end);
					var replacemet = oldText.substring(0, caret) + oldText.substring(end);
					item.set('text', replacemet);
					siblings.insertAt(index + 1, store.createRecord('listItemDatum', {text: newItem}));
				}
			}
			if(event.which === 9) {		// Tab
				event.preventDefault();
				if(event.shiftKey) {
					if(index === 0) {
						siblings.removeObject(item);
						var grandparent = parent.get('parent');
						var grandsiblings = grandparent.get('children');
						var newIndex = grandsiblings.indexOf(parent);
						grandsiblings.insertAt(newIndex + 1, item);
					}
				} else {
					if(index !== 0) {
						var newParent = siblings.objectAt(index - 1);
						newParent.get('children').addObject(item);
					}
				}
			}
			if(event.which === 8 && event.shiftKey) {
				event.preventDefault();
				siblings.removeObject(item);
			}
		});
		inputs.first().focus();
	},
	actions: {
		zoom: function(model) {
			this.sendAction('action', model);
		},
		passRoot: function(model) {
			this.sendAction('action', model);
		}
	}
});
