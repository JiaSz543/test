import getId from './radomId';

const createVueNode = (event, addNodes, project, store) => {
  const id = getId();

  const type = event.dataTransfer?.getData('application/vueflow');
  const position = project({ x: event.clientX - 450, y: event.clientY - 20 });

  const newNode = {
    id: type + id,
    type,
    position,
    label: `${type} node`,
  };

  store.$patch((state) => {
    state.layers.messages.push({
      id: newNode.id,
    });
  });

  addNodes([newNode]);
};

export { createVueNode };
