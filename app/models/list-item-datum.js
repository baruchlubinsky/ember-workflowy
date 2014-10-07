import DS from 'ember-data';

export default DS.Model.extend({
  children: DS.hasMany('list-item-data', {inverse: 'parent'}),
  parent: DS.belongsTo('list-item-datum', {inverse: 'children'}),
  text: DS.attr('string'),
  note: DS.attr('string'),
});
