export async function getComponentData(componentName, id) {
  try {
      const data = await import(`../content/component-data/${componentName}-${id}.json`);
      return data.default;
  } catch (error) {
    console.error(`Error reading data for ${componentName} with id ${id}:`, error);
    return null;
  }
}

export async function getComponentDataNoId(componentName) {
  try {
      const data = await import(`../content/component-data/${componentName}.json`);
      return data.default;
  } catch (error) {
    console.error(`Error reading data for ${componentName}`, error);
    return null;
  }
}
