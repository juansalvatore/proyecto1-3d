var treeData = {
  name: 'Autoridades Superiores',
  children: [
    {
      name: '22% hombres',
    },
    {
      name: '88% mujeres',
    },
    {
      name: 'Fuera de Nivel',
      children: [
        { name: '27% de mujeres' },
        { name: '83% de hombres' },
        {
          name: 'Alta Dirección',
          children: [
            { name: '42% de mujeres' },
            { name: '48% de hombres' },
            {
              name: 'No Directivo',
              children: [
                { name: '36%% de mujeres' },
                {
                  name: '64% de hombres',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

// Set the dimensions and margins of the diagram
console.log('data--', treeData)
var margin = {
    top: 20,
    right: 90,
    bottom: 30,
    left: 90,
  },
  width = 2000 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3
  .select('.tree')
  .append('svg')
  .attr('width', width + margin.right + margin.left)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

var i = 0,
  duration = 750,
  root

// declares a tree layout and assigns the size
var treemap = d3.tree().size([height, width])

// Assigns parent, children, height, depth
root = d3.hierarchy(treeData, function(d) {
  return d.children
})
root.x0 = height / 2
root.y0 = 0

// Collapse after the second level
root.children.forEach(collapse)

update(root)

// Collapse the node and all it's children
function collapse(d) {
  if (d.children) {
    d._children = d.children
    d._children.forEach(collapse)
    d.children = null
  }
}

function update(source) {
  // Assigns the x and y position for the nodes
  var treeData = treemap(root)

  // Compute the new tree layout.
  var nodes = treeData.descendants(),
    links = treeData.descendants().slice(1)

  // Normalize for fixed-depth.
  nodes.forEach(function(d) {
    d.y = d.depth * 180
  })

  // ****************** Nodes section ***************************

  // Update the nodes...
  var node = svg.selectAll('g.node').data(nodes, function(d) {
    return d.id || (d.id = ++i)
  })

  // Enter any new modes at the parent's previous position.
  var nodeEnter = node
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', function(d) {
      return 'translate(' + source.y0 + ',' + source.x0 + ')'
    })
    .on('click', click)

  // Add Circle for the nodes
  nodeEnter
    .append('circle')
    .attr('class', 'node')
    .attr('r', 1e-6)
    .style('fill', function(d) {
      return d._children ? 'lightsteelblue' : '#fff'
    })

  // Add labels for the nodes
  nodeEnter
    .append('text')
    .attr('dy', '.35em')
    .attr('x', function(d) {
      return d.children || d._children ? -13 : 13
    })
    .attr('text-anchor', function(d) {
      return d.children || d._children ? 'end' : 'start'
    })
    .text(function(d) {
      return d.data.name
    })
    .style('fill', function(d) {
      return d.type
    })
    .call(wrap, 30)

  nodeEnter
    .append('text')
    .attr('dy', '.4em')
    .attr('x', function(d) {
      return d.children || d._children ? 4 : -4
    })
    .attr('text-anchor', function(d) {
      return d.children || d._children ? 'end' : 'start'
    })
    .text(function(d) {
      var children = d.children || d._children
      return children ? children.length : null
    })

  // UPDATE
  var nodeUpdate = nodeEnter.merge(node)

  // Transition to the proper position for the node
  nodeUpdate
    .transition()
    .duration(duration)
    .attr('transform', function(d) {
      return 'translate(' + d.y + ',' + d.x + ')'
    })

  // Update the node attributes and style
  nodeUpdate
    .select('circle.node')
    .attr('r', 10)
    .style('fill', function(d) {
      //console.log("parentID",d.aspid);
      return d._children ? 'lightsteelblue' : '#fff'
    })
    // if(d._parentid !== null){
    // .style("fill", "blue")
    // }
    .attr('cursor', 'pointer')

  // Remove any exiting nodes
  var nodeExit = node
    .exit()
    .transition()
    .duration(duration)
    .attr('transform', function(d) {
      return 'translate(' + source.y + ',' + source.x + ')'
    })
    .remove()

  // On exit reduce the node circles size to 0
  nodeExit.select('circle').attr('r', 1e-6)

  // On exit reduce the opacity of text labels
  nodeExit.select('text').style('fill-opacity', 1e-6)

  // ****************** links section ***************************

  // Update the links...
  var link = svg.selectAll('path.link').data(links, function(d) {
    return d.id
  })

  // Enter any new links at the parent's previous position.
  var linkEnter = link
    .enter()
    .insert('path', 'g')
    .attr('class', 'link')
    .attr('d', function(d) {
      var o = {
        x: source.x0,
        y: source.y0,
      }
      return diagonal(o, o)
    })

  // UPDATE
  var linkUpdate = linkEnter.merge(link)

  // Transition back to the parent element position
  linkUpdate
    .transition()
    .duration(duration)
    .attr('d', function(d) {
      return diagonal(d, d.parent)
    })

  // Remove any exiting links
  var linkExit = link
    .exit()
    .transition()
    .duration(duration)
    .attr('d', function(d) {
      var o = {
        x: source.x,
        y: source.y,
      }
      return diagonal(o, o)
    })
    .remove()

  // Store the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x
    d.y0 = d.y
  })

  // Creates a curved (diagonal) path from parent to the child nodes
  function diagonal(s, d) {
    path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

    return path
  }

  function mousemove(d) {
    div
      .text('Info about ' + d.name + ':' + d.info)
      .style('left', d3.event.pageX + 'px')
      .style('top', d3.event.pageY + 'px')
  }

  function mouseout() {
    div
      .transition()
      .duration(300)
      .style('opacity', 1e-6)
  }

  // Toggle children on click.
  function click(d) {
    console.log('dataa---', d.data.parentid)
    if (d.children) {
      d._children = d.children
      d.children = null
    } else {
      d.children = d._children
      d._children = null
    }
    update(d)
  }
}

/* Word Wrap */
function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
      words = text
        .text()
        .split(/\s+/)
        .reverse(),
      word,
      line = [],
      lineNumber = 1,
      lineHeight = 1, // ems
      x = text.attr('x'),
      y = text.attr('y'),
      dy = 0, //parseFloat(text.attr("dy")),
      tspan = text
        .text(null)
        .append('tspan')
        .attr('x', x)
        .attr('y', y)
        .attr('dy', dy + 'em')
    while ((word = words.pop())) {
      line.push(word)
      tspan.text(line.join(' '))
      if (tspan.node().getComputedTextLength() > width) {
        line.pop()
        tspan.text(line.join(' '))
        line = [word]
        tspan = text
          .append('tspan')
          .attr('x', x)
          .attr('y', y)
          .attr('dy', lineNumber * lineHeight + dy + 'em')
          .text(word)
      }
    }
  })
}
