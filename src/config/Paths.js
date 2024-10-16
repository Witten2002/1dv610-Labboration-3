/**
 * A file to create every path in this project.
 *
 * @author Ludwig Wittenberg <lw223cq@student.lnu.se>
 * @version 1.0.0
 */

const PATH = {
  HOME: './',
  DIAGRAMS: './diagrams',
  CREATE_DIAGRAM: './create-diagram',
  HORIZONTALBAR: './diagrams/horizontalBar-diagram',
  LINEDIAGRAM: './diagrams/line-diagram',
  CIRCLEDIAGRAM: './diagrams/circle-diagram'
}

const VIEWS = {
  HOME: 'home/index',
  HORIZONTALBAR: 'diagrams/horizontalBar',
  LINEDIAGRAM: 'diagrams/linediagram',
  CIRCLEDIAGRAM: 'diagrams/circlediagram',
  CREATE_DIAGRAM: 'createDiagram/index'
}

const ROUTER_PATH = {
  HOME: '/',
  DIAGRAMS: '/diagrams',
  HORIZONTALBAR: '/horizontalBar-diagram',
  LINEDIAGRAM: '/line-diagram',
  CIRCLEDIAGRAM: '/circle-diagram',
  CREATE_DIAGRAM: '/create-diagram'
}

export { PATH, VIEWS, ROUTER_PATH }
