/**
 * JavaScriptCore entry point, for building on a machine with no Node.
 *
 * jsc runs ES modules but has no filesystem, so this prints the rendered map as
 * JSON on stdout and build-aeo.py writes it. Same renderer as make-aeo.mjs —
 * the output is byte-identical, which is the whole point of keeping
 * aeo-render.mjs filesystem-free.
 *
 *   jsc -m aeo-emit.mjs        (see build-aeo.py, which invokes this)
 */
import { render } from './aeo-render.mjs'

print(JSON.stringify(render()))
